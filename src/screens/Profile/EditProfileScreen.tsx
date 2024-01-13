import React, {useEffect, useState} from 'react';
import {
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

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch('http://10.0.2.2:3001/users/1')
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setFullName(data.full_name);
        setDescription(data.description);
      })
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (text, setter) => [
    setter(text),
    setIsChanged(true),
  ];

  const handleSaveChanges = () => {
    Alert.alert('Update Profile', 'Are you sure you want to save changes?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          fetch('http://10.0.2.2:3001/users/1/update', {
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
      <View style={styles.container}>
        <View style={{position: 'relative'}}>
          <TouchableOpacity>
            <Image
              style={styles.bannerImage}
              source={require('../../assets/bgProfile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/avatar2.png')}
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
      </View>
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
