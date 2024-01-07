import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CustomTextInput from '../components/Register_TextInput';
import SubmitButton from '../components/ResetPassword_SubmitButton';

const ResetPasswordScreen: React.FC = () => {
    return (
        <View style={[tw`p-4 flex-1 justify-center items-center`, { backgroundColor: '#002351' }]}>
            <Text style={[tw`text-white text-center mb-8`, { fontSize: 32, fontWeight: 'bold' }]}>Reset Password</Text>
            <CustomTextInput placeholder="Password" secureTextEntry={true} />
            <CustomTextInput placeholder="Confirm Password" secureTextEntry={true} />
            <View style={{ marginTop: 20 }}>
                <SubmitButton />
            </View>
        </View>
    );
};

export default ResetPasswordScreen;