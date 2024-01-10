import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

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

const FeedItem = ({item}: {item: any}) => (
  <View>
    <View style={[tw`p-4 rounded-md ml-4`, {backgroundColor: '#002351'}]}>
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
      <View style={tw`flex-row`}>
        <View style={tw`flex-row items-center mr-4`}>
          <Icon name="heart-o" size={16} color="white" />
          <Text style={tw`text-white ml-2`}>{item.likes}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Fontisto name="comment" size={16} color="white" />
          <Text style={tw`text-white ml-2`}>{item.comments}</Text>
        </View>
      </View>
    </View>
    <View style={{height: 1, backgroundColor: '#001736'}} />
  </View>
);

export default FeedItem;
