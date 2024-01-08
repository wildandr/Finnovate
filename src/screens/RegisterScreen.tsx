import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native'; // Import TouchableOpacity
import {Checkbox} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SignUpButton from '../components/Register_SignUpButton';
import CustomTextInput from '../components/Register_TextInput';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

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
        Sign Up
      </Text>
      <CustomTextInput placeholder="Name" />
      <CustomTextInput placeholder="Email" />
      <CustomTextInput placeholder="Username" />
      <CustomTextInput placeholder="Password" secureTextEntry={true} />
      <View style={tw`flex-row items-center mb-4`}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            console.log('Checkbox pressed');
            setIsChecked(!isChecked);
          }}
          color="blue"
          uncheckedColor="white"
        />
        <View style={tw`ml-2 flex-shrink`}>
          <Text style={[tw`text-white`, {fontSize: 12}]}>
            I certify that I am 18 years of age or older, I agree to the User
            Agreement, and I have read the Privacy Policy.
          </Text>
        </View>
      </View>
      <SignUpButton />
      <View style={tw`my-5`}>
        <Image
          source={require('../assets/Or.png')}
          style={{alignSelf: 'center'}}
        />
      </View>
      <GoogleLoginButton />
      <View style={tw`flex-row justify-center items-center`}>
        <Text style={tw`text-white`}>I already have an account. </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[{fontWeight: 'bold', color: '#FFBC00'}]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
