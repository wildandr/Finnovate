import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const StatistikProfile = ({ number, title, onPress, style }: { number: number, title: string, onPress: () => void, style: any }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[tw`items-center`, style]}>
      <Text style={tw`text-white font-bold`}>{number}</Text>
      <Text style={tw`text-white`}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default StatistikProfile;