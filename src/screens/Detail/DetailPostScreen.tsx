// DetailPostScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import FeedItem from '../../components/FeedItem';
import tw from 'tailwind-react-native-classnames';
import CommentItem from '../../components/CommentItem';
import FeedDetailItem from '../../components/FeedDetaiIItem';

const DetailPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {item} = route.params;

  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (!item || !item.post_id) {
      console.error('Invalid item:', item);
      return;
    }

    fetch(`http://10.0.2.2:3001/posts/${item.post_id}/comments`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setComments(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [item]);

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View
        style={[
          tw`flex-row items-center p-3 justify-between`,
          {
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            backgroundColor: '#002351',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg mx-2 font-bold`}>Post</Text>
        <View style={{width: 24}} />
      </View>
      <ScrollView style={tw`pt-16`}>
        <FeedDetailItem item={item} />
        <FlatList
          style={tw`pb-24`}
          data={comments}
          keyExtractor={item => item.comment_id.toString()}
          renderItem={({item}) => <CommentItem comment={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default DetailPostScreen;
