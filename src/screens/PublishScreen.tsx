import React, {useState} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import PublishButton from '../components/PublishButton';
import {useNavigation} from '@react-navigation/native';

const PublishScreen = () => {
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const publishPost = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3001/new-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // TODO: replace with actual user_id
          caption: content,
          post_url: null,
          image_path: null,
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
          <View style={tw`flex-1 ml-28`}>
            <Text style={tw`text-2xl text-white`}>Create Post</Text>
          </View>
          <View style={tw`w-24`}>
            <PublishButton onPress={publishPost} />
          </View>
        </View>
        <View style={tw`flex-row items-center mt-4`}>
          <Icon name="user-circle" size={36} color="white" style={tw`mr-2`} />
          <TextInput
            style={[tw`flex-1 p-2`, {color: 'white', flexShrink: 1}]}
            placeholder="What have you been eyeing lately?"
            placeholderTextColor="#CBD5E0" // gray-200 in Tailwind CSS
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={0}
          />
        </View>
      </View>
    </View>
  );
};

export default PublishScreen;
