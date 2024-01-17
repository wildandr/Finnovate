import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native';
import {formatDistanceToNow, format} from 'date-fns';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInHours = (now.getTime() - date.getTime()) / 1000 / 60 / 60;

  if (diffInHours < 24) {
    return formatDistanceToNow(date) + ' ago';
  } else if (diffInHours < 48) {
    return 'yesterday';
  } else {
    return format(date, 'MMM dd');
  }
};

const CommentItem = ({comment}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes_count);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(
          `http://10.0.2.2:3001/commentLikes/${comment.comment_id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const likes = await response.json();
        const userLike = likes.find(
          (like: any) => like.user_id.toString() === userId,
        );
        setIsLiked(!!userLike);
      } catch (error) {
        console.error('Failed to fetch likes:', error);
      }
    };

    fetchLikes();
  }, [comment.comment_id]);

  const handleLike = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const url = isLiked
      ? `http://10.0.2.2:3001/commentLikes/delete`
      : `http://10.0.2.2:3001/commentLikes/create`;
    const method = isLiked ? 'DELETE' : 'POST';
    const body = JSON.stringify({
      user_id: userId,
      comment_id: comment.comment_id,
    });

    const response = await fetch(url, {
      method,
      body,
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      const responseBody = await response.json();
      console.log(
        `Successfully ${method}d like. Server response:`,
        responseBody,
      );
    } else {
      console.error(`Failed to ${method} like. Server response:`, response);
    }

    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
  };

  return (
    <View style={[tw`flex-row pt-3 ml-4 mt-2`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-1 ml-3`}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={
              comment?.commenter_profile_picture
                ? {uri: comment.commenter_profile_picture}
                : {
                    uri: `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                      comment.commenter_full_name || '',
                    )}&size=40`,
                  }
            }
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              marginRight: 8,
              borderWidth: 1,
              borderColor: 'black',
            }}
          />
          <View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-bold text-white ml-2`}>
                {comment.commenter_username}
              </Text>
              <Entypo
                name="dot-single"
                size={16}
                color="gray"
                style={tw`mx-1`}
              />
              <Text style={tw`text-gray-400`}>
                {formatDate(comment.date_created)}
              </Text>
            </View>
            <View style={tw`flex-row mt-1`}>
              <Text style={tw`text-gray-400 ml-2`}>Replying to </Text>
              <Text style={tw`text-yellow-400`}>
                @{comment.post_owner_username}
              </Text>
            </View>
          </View>
        </View>
        <Text style={tw`text-white mt-3 ml-12`}>{comment.content}</Text>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <View style={tw`flex-row ml-12`}>
            <View style={tw`flex-row items-center mr-4`}>
              <TouchableOpacity onPress={handleLike}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={16}
                  color={isLiked ? 'white' : 'gray'}
                />
              </TouchableOpacity>
              <Text style={tw`text-gray-500 ml-2`}>{likes}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Fontisto name="comment" size={16} color="gray" />
              <Text style={tw`text-gray-500 ml-2`}>
                {comment.replies_count}
              </Text>
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
