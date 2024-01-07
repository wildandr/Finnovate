import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
  return (
    <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: '#002351' }]}>
      <Image
        source={require('../assets/Finnovate_logo_top.png')}
        style={tw`absolute top-5 left-5`}
      />
      <TextInput
        style={[tw`h-10 w-4/5 absolute top-20 rounded-lg px-2`, { backgroundColor: '#00112B', color: 'white', paddingLeft: 20 }]}
        placeholder=" Search feeds, trend"
        placeholderTextColor="white"
      />
      <Text style={tw`text-white`}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;