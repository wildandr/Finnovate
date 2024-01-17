import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import supabase from '../../../server/supabaseClient';
import {decode} from 'base64-arraybuffer';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [userData, setUserData] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUserId = await AsyncStorage.getItem('user_id');
      fetch(`http://10.0.2.2:3001/users/${storedUserId}`)
        .then(response => response.json())
        .then(data => {
          setUsername(data.username);
          setFullName(data.full_name);
          setDescription(data.description);
          setUserData(data);
        })
        .catch(error => console.error(error));
    };

    fetchUser();
  }, []);

  const handleInputChange = (text, setter) => [
    setter(text),
    setIsChanged(true),
  ];

  const handleSaveChanges = async () => {
    const storedUserId = await AsyncStorage.getItem('user_id');

    Alert.alert('Update Profile', 'Are you sure you want to save changes?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          fetch(`http://10.0.2.2:3001/users/${storedUserId}/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              full_name: fullName,
              description: description,
            }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then(data => {
              console.log(data);
              navigation.goBack();
            })
            .catch(error => console.error(error));
        },
      },
    ]);
  };

  const openImagePicker = async (setImageFunction, cropWidth, cropHeight) => {
    const pickedImage = await ImagePicker.openPicker({
      width: cropWidth,
      height: cropHeight,
      cropping: true,
      includeBase64: true,
    });

    setImageFunction(pickedImage.path);

    const timestamp = Date.now();
    const uniqueSign = Math.floor(Math.random() * 1000);
    const fileName = `imagePost_${timestamp}_${uniqueSign}.jpg`;

    const base64FileData = pickedImage.data;

    const file = {
      uri: pickedImage.path,
      name: fileName,
      type: 'image/jpeg',
    };

    const {data, error} = await supabase.storage
      .from('post_photo')
      .upload(file.name, decode(base64FileData), {
        contentType: 'image/jpg',
      });

    if (error) {
      console.error('Error uploading image: ', error);
    } else {
      const urlResponse = await supabase.storage
        .from('post_photo')
        .getPublicUrl(file.name);

      if (urlResponse.error) {
        console.error('Error getting image URL: ', urlResponse.error);
      } else {
        const imageUrl = urlResponse.data.publicUrl;
        console.log('Image URL: ', imageUrl);
        setImageFunction(imageUrl);
      }
    }
  };

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>Profile</Text>
        <TouchableOpacity disabled={!isChanged} onPress={handleSaveChanges}>
          <Icon
            name="checkmark"
            size={24}
            color={isChanged ? '#FFBC00' : 'gray'}
            style={{opacity: isChanged ? 1 : 0.5}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={() => {
              openImagePicker(setSelectedBannerImage, 400, 100);
            }}>
            <View
              style={[
                styles.bannerImage,
                {
                  backgroundColor:
                    selectedBannerImage || userData?.banner_picture_url
                      ? 'transparent'
                      : 'grey',
                },
              ]}>
              {(selectedBannerImage || userData?.banner_picture_url) && (
                <Image
                  style={StyleSheet.absoluteFill}
                  source={{
                    uri: selectedBannerImage || userData.banner_picture_url,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openImagePicker(setSelectedImage, 300, 400);
            }}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : userData?.profile_picture_url
                  ? {uri: userData.profile_picture_url}
                  : {
                      uri: `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                        userData?.full_name || '',
                      )}&size=250`,
                    }
              }
              style={{
                width: 90,
                height: 90,
                borderRadius: 30,
                position: 'absolute',
                bottom: -40,
                left: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`px-5 mt-8`}>
          <Text style={tw`text-white text-lg font-bold mt-12`}>Name</Text>
          <TextInput
            value={fullName}
            placeholder="Enter your name"
            placeholderTextColor="white"
            style={tw`border-b border-white text-white`}
            onChangeText={text => handleInputChange(text, setFullName)}
          />
          <Text style={tw`text-white text-lg font-bold mt-4`}>Username</Text>
          <TextInput
            value={username}
            placeholder="Enter your username"
            placeholderTextColor="white"
            style={tw`border-b border-white text-white`}
            onChangeText={text => handleInputChange(text, setUsername)}
          />
          <Text style={tw`text-white text-lg font-bold mt-4`}>Bio</Text>
          <TextInput
            value={description}
            placeholder="Enter your bio"
            placeholderTextColor="white"
            style={tw`border-b border-white text-white`}
            onChangeText={text => handleInputChange(text, setDescription)}
          />
          <Text style={tw`text-white text-lg font-bold mt-4`}>Account</Text>
          <TouchableOpacity>
            <Text style={tw`text-yellow-400 mt-2`}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-red-500 mt-2`}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001736',
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
});

export default EditProfileScreen;
