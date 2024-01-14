// DetailPostScreen.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import FeedItem from '../../components/FeedItem';
import tw from 'tailwind-react-native-classnames';
import CommentItem from '../../components/CommentItem';
import FeedDetailItem from '../../components/FeedDetaiIItem';

const DetailPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Assuming the item is passed as a route param
  const {item} = route.params;

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-row items-center p-3 justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg mx-2 font-bold`}>Detail Post</Text>
        <View style={{width: 24}} />
      </View>
      <FeedDetailItem item={item} />
      <View style={{height: 2, backgroundColor: '#001736'}} />
      <CommentItem />
    </View>
  );
};

export default DetailPostScreen;
