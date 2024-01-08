import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedItem = ({ item }: { item: any }) => (
  <View style={[tw`p-4 m-2 rounded-md`, { backgroundColor: '#002351' }]}>
    <View style={tw`flex-row`}>
      <Icon name="user-circle" size={42} color="white" style={tw`mr-2`} />
      <View>
        <Text style={tw`font-bold text-white`}>{item.username}</Text>
        <Text style={tw`text-white`}>{item.timestamp}</Text>
      </View>
    </View>
    <Text style={tw`text-white mt-2`}>{item.text}</Text>
    <Image source={item.image} resizeMode="cover" />
  </View>
);

export default FeedItem;