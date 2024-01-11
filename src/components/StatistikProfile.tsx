import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const StatistikProfile = ({ number, title, style }: { number: number, title: string, style: any }) => (
    <View style={[tw`items-center`, style]}>
      <Text style={tw`text-white font-bold`}>{number}</Text>
      <Text style={tw`text-white`}>{title}</Text>
    </View>
  );

export default StatistikProfile;