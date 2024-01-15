import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';
import PublishButton from '../../components/PublishButton';
import {useNavigation} from '@react-navigation/native';
import ShareButton from '../../components/ShareButton';
import TradingPlanCard from '../../components/TradingPlanCard';
import PublishImageCard from '../../components/PublishImageCard';
import ImagePicker from 'react-native-image-crop-picker';
import supabase from '../../../server/supabaseClient';
import {decode} from 'base64-arraybuffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PublishScreen = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [showTradingPlanCard, setShowTradingPlanCard] = useState(false);
  const [tradingPlanCardValues, setTradingPlanCardValues] = useState({});

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then(async pickedImage => {
      setImage({uri: pickedImage.path});

      const timestamp = Date.now();
      const uniqueSign = Math.floor(Math.random() * 1000);
      const fileName = `imagePost_${timestamp}_${uniqueSign}.jpg`;

      const base64FileData = pickedImage.data;

      const file = {
        uri: pickedImage.path,
        name: fileName,
        type: 'image/jpeg',
      };

      const bucketId = 'post_photo';
      const {data, error} = await supabase.storage
        .from(bucketId)
        .upload(file.name, decode(base64FileData), {
          contentType: 'image/jpg',
        });

      if (error) {
        console.error('Error uploading image: ', error);
        setImageUrl(null);
      } else {
        const urlResponse = await supabase.storage
          .from(bucketId)
          .getPublicUrl(file.name);

        if (urlResponse.error) {
          console.error('Error getting image URL: ', urlResponse.error);
        } else {
          console.log('Image URL: ', urlResponse.data.publicUrl);
          setImageUrl(urlResponse.data.publicUrl);
        }
      }
    });
  };

  const publishPostCard = async () => {
    try {
      const {
        equitySymbol,
        targetPrice,
        initiatePrice,
        timing,
        upsidePercentage,
        prediction,
      } = tradingPlanCardValues;

      const response = await fetch('http://10.0.2.2:3001/postcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: equitySymbol,
          target_price: targetPrice,
          initial_price: initiatePrice,
          timing: timing,
          upside_percentage: upsidePercentage,
          prediction: prediction,
        }),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Failed to publish postcard:', error);
    }
  };

  const publishPost = async analysis_id => {
    const userId = await AsyncStorage.getItem('user_id');
    try {
      const response = await fetch('http://10.0.2.2:3001/new-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          caption: content,
          post_url: null,
          image_path: imageUrl,
          analysis_id,
        }),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      Alert.alert('Post published', 'Your post was published successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to publish post:', error);
    }
  };

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
          </TouchableOpacity>
          <View style={tw`flex-1 ml-20`}>
            <Text style={tw`text-2xl text-white`}>Create Post</Text>
          </View>
          <View style={tw`w-24`}>
            <PublishButton
              disabled={content.trim() === ''}
              onPress={async () => {
                if (showTradingPlanCard) {
                  const analysis_id = await publishPostCard();
                  publishPost(analysis_id);
                } else {
                  publishPost();
                }
              }}
            />
          </View>
        </View>
        <View style={tw`flex-row items-center mt-4`}>
          <Icon name="user-circle" size={36} color="white" style={tw`mr-2`} />
          <TextInput
            style={[tw`flex-1 p-2`, {color: 'white', flexShrink: 1}]}
            placeholder="What have you been eyeing lately?"
            placeholderTextColor="#CBD5E0"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={0}
          />
        </View>
        <ShareButton onPress={() => setShowTradingPlanCard(prev => !prev)} />
        {showTradingPlanCard && (
          <TradingPlanCard onValuesChange={setTradingPlanCardValues} />
        )}
        <PublishImageCard image={image} />
      </View>
      <View style={tw`absolute bottom-0 left-0 p-4`}>
        <TouchableOpacity
          style={[tw`p-2 rounded-full`, {backgroundColor: '#2A476E'}]}
          onPress={openImagePicker}>
          <MaterialIcons name="image" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublishScreen;
