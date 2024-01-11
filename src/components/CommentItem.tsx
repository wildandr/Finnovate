import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentItem = ({ item }) => {
  return (
    <View style={tw`flex-row p-8`}>
      <Icon name="user-circle" size={36} color="#fff" />
      <View style={tw`ml-4 flex-1`}>
        <Text style={tw`text-white font-bold`}>{item.username}</Text>
        <Text style={tw`text-white`}>
          Reply
          <Text style={tw`text-yellow-500`}>@{item.replyTo}</Text>
        </Text>
        <Text style={tw`text-white mt-2`}>{item.text}</Text>
        <Text style={tw`text-gray-500 mt-2`}>{item.timestamp}</Text>
      </View>
    </View>
  );
};

export default CommentItem;