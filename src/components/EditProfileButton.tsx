import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const EditProfileButton = () => (
  <View style={tw`mt-4`}>
    <TouchableOpacity 
      style={[tw`w-24 h-8 rounded-full justify-center items-center`, { backgroundColor: '#7F91AB' }]}
      onPress={() => {}}
    >
      <Text style={tw`text-white`}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);

export default EditProfileButton;