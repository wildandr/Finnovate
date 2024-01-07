import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import LoginButton from '../components/Login_LoginButton';
import CustomTextInput from '../components/Register_TextInput';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={[tw`p-4 flex-1 justify-center items-center`, { backgroundColor: '#002351' }]}>
            <Text style={[tw`text-white text-center mb-8`, { fontSize: 32, fontWeight: 'bold' }]}>Sign In</Text>
            <CustomTextInput placeholder="Email/Phone number" />
            <CustomTextInput placeholder="Password" secureTextEntry={true} />
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={{ alignSelf: 'flex-end' }}>
                <Text style={[tw`text-right`, { color: '#FFBC00', fontSize: 12 }]}>Forgot your password?</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
                <LoginButton />
            </View>
            <View style={tw`my-5`}>
                <Image source={require('../assets/Or.png')} style={{ alignSelf: 'center' }} />
            </View>
            <GoogleLoginButton />
            <View style={tw`flex-row justify-center items-center mt-4`}>
                <Text style={tw`text-white`}>New to us? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[{ fontWeight: 'bold', color: '#FFBC00' }]}>Sign Up Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;