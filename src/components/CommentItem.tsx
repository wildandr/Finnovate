import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native';
import {formatDistanceToNow, format} from 'date-fns';
import tw from 'tailwind-react-native-classnames';

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
              <TouchableOpacity>
                <Icon name="heart-o" size={16} color="gray" />
              </TouchableOpacity>
              <Text style={tw`text-gray-500 ml-2`}>{comment.likes_count}</Text>
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
