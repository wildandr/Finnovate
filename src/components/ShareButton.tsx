import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ShareButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={[tw`p-2 rounded-full mt-6 mb-6`, { width: 175, height: 38, backgroundColor: '#2A476E' }]}>
    <Text style={tw`text-white text-center`}>Share Your Trading Plan</Text>
  </TouchableOpacity>
);

export default ShareButton;