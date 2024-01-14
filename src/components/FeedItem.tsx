import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import PredictionCard from './PredictionCard';
import {useNavigation} from '@react-navigation/native';

function formatTimestamp(timestamp) {
  const time = moment(timestamp);
  const now = moment();
  const diffMinutes = now.diff(time, 'minutes');
  const diffHours = now.diff(time, 'hours');
  const diffDays = now.diff(time, 'days');

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return time.format('YYYY-MM-DD HH:mm');
  }
}

const FeedItem = ({item}: {item: any}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch('http://10.0.2.2:3001/likes');
      const likes = await response.json();
      const userLike = likes.find(
        (like: any) => like.user_id === 1 && like.post_id === item.post_id,
      );
      setIsLiked(!!userLike);
    };

    fetchLikes();
  }, [item]);

  const handleLike = async () => {
    const url = isLiked
      ? 'http://10.0.2.2:3001/likes/delete'
      : 'http://10.0.2.2:3001/likes/create';
    const method = isLiked ? 'DELETE' : 'POST';
    const body = JSON.stringify({user_id: 1, post_id: item.post_id});

    await fetch(url, {
      method,
      body,
      headers: {'Content-Type': 'application/json'},
    });
    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailPost', {item})}>
      <View>
        <View
          style={[tw`p-4 rounded-md ml-4 mt-2`, {backgroundColor: '#002351'}]}>
          <View style={tw`flex-row`}>
            <Icon name="user-circle" size={36} color="white" style={tw`mr-2`} />
            <View style={tw`ml-2`}>
              <Text style={tw`font-bold text-white`}>{item.username}</Text>
              <Text style={tw`text-white`}>
                {formatTimestamp(item.date_created)}
              </Text>
            </View>
            <Entypo
              name="dots-three-vertical"
              size={16}
              color="white"
              style={tw`ml-auto`}
            />
          </View>
          <Text style={tw`text-white my-3`}>{item.caption}</Text>
          {item.image_path && (
            <View
              style={{
                width: 200,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.image_path}}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          )}
          {item.analysis && <PredictionCard analysis={item.analysis} />}

          <View style={tw`flex-row`}>
            <View style={tw`flex-row items-center mr-4`}>
              <TouchableOpacity onPress={handleLike}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={tw`text-white ml-2`}>{likes}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CommentPost', {postId: item.post_id})
                }>
                <Fontisto name="comment" size={16} color="white" />
              </TouchableOpacity>
              <Text style={tw`text-white ml-2`}>{item.comments}</Text>
            </View>
          </View>
        </View>
        <View style={[tw`mt-4`, {height: 1, backgroundColor: '#001736'}]} />
      </View>
    </TouchableOpacity>
  );
};

export default FeedItem;
