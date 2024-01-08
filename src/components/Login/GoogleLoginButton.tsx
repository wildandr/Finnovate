// /src/components/GoogleLoginButton.tsx
import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native'; // Import View and Image here
import tw from 'tailwind-react-native-classnames';

const GoogleLoginButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={tw`h-16 w-96 bg-white p-3 rounded-lg mb-4 border border-gray-300 justify-center items-center`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={require('../../assets/google.png')}
          style={tw`w-6 h-6 mr-2`}
        />
        <Text style={tw`text-black text-center text-lg`}>
          Login With Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;
