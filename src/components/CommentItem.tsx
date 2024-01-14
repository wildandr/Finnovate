import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const CommentItem = () => {
  return (
    <View style={[tw`flex-row pt-3 ml-4 mt-4`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-1 ml-3`}>
        <View style={tw`flex-row items-center`}>
          <Icon name="user-circle" size={36} color="white" style={tw`mr-2`} />
          <View>
            <Text style={tw`font-bold text-white ml-2`}>User Name</Text>
            <View style={tw`flex-row`}>
              <Text style={tw`text-white ml-2`}>Replying to </Text>
              <Text style={tw`text-yellow-400`}>@AnotherUser</Text>
            </View>
          </View>
        </View>
        <Text style={tw`text-white mt-4`}>This is a comment</Text>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <Text style={tw`text-gray-500`}>27 Des 23, 20:12</Text>
          <View style={tw`flex-row`}>
            <View style={tw`flex-row items-center mr-4`}>
              <TouchableOpacity>
                <Icon name="heart-o" size={16} color="gray" />
              </TouchableOpacity>
              <Text style={tw`text-gray-500 ml-2`}>1k</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Fontisto name="comment" size={16} color="gray" />
              <Text style={tw`text-gray-500 ml-2`}>2k</Text>
            </View>
          </View>
        </View>
      </View>
      <Entypo
        name="dots-three-vertical"
        size={16}
        color="white"
        style={tw`mr-4`}
      />
      <View style={[tw`mt-2`, {height: 1, backgroundColor: '#001736'}]} />
    </View>
  );
};

export default CommentItem;
