import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {Checkbox} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import LoginButton from '../components/Login_LoginButton';
import CustomTextInput from '../components/Register_TextInput';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.text();
      } catch (error) {
        console.error('Error:', error);
      }

      console.log('Response:', data);

      await AsyncStorage.setItem('isLoggedIn', 'true');

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View
      style={[
        tw`p-4 flex-1 justify-center items-center`,
        {backgroundColor: '#002351'},
      ]}>
      <Text
        style={[
          tw`text-white text-center mb-8`,
          {fontSize: 32, fontWeight: 'bold'},
        ]}>
        Sign In
      </Text>
      <CustomTextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <CustomTextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={loginUser} style={{alignSelf: 'flex-end'}}>
        <Text style={[tw`text-right`, {color: '#FFBC00', fontSize: 12}]}>
          Forgot your password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20}}>
        <LoginButton onPress={loginUser} />
      </TouchableOpacity>
      <View style={tw`my-5`}>
        <Image
          source={require('../assets/Or.png')}
          style={{alignSelf: 'center'}}
        />
      </View>
      <GoogleLoginButton />
      <View style={tw`flex-row justify-center items-center mt-4`}>
        <Text style={tw`text-white`}>New to us? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[{fontWeight: 'bold', color: '#FFBC00'}]}>
            Sign Up Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
