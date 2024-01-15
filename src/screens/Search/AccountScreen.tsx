import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ItemProps {
  full_name: string;
  username: string;
  profile_picture_url: string;
  isFollowing: boolean;
}

const Item = ({
  name,
  username,
  profile_picture_url,
  isFollowing,
  handleFollow,
  handleUnfollow,
}: ItemProps) => (
  <View style={tw`flex-row items-center mt-5`}>
    <Image
      source={
        profile_picture_url
          ? {uri: profile_picture_url}
          : {
              uri: `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                name || '',
              )}&size=50`,
            }
      }
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
      }}
    />
    <View style={tw`ml-2`}>
      <Text style={tw`text-white text-lg font-bold`}>{name}</Text>
      <Text style={tw`text-yellow-400`}>@{username}</Text>
    </View>

    <TouchableOpacity
      onPress={() => {
        isFollowing ? handleUnfollow() : handleFollow();
      }}
      style={[
        tw`h-10 ml-auto border p-2 rounded-lg`,
        isFollowing
          ? tw`border-white bg-transparent`
          : tw`border-gray-500 bg-white`,
      ]}>
      <Text style={[tw`mx-2`, isFollowing ? tw`text-white` : tw`text-black`]}>
        {isFollowing ? 'Remove' : 'Follow'}
      </Text>
    </TouchableOpacity>
  </View>
);

const AccountScreen = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState<ItemProps[]>([]);
  const [followings, setFollowings] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const searchText = route.params.searchText;
  console.log('searchTextPopular:', searchText);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      setUserId(id);
    };

    getUserId();

    fetch('http://10.0.2.2:3001/search-users?searchTerm=' + searchText)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json);
      });

    fetch('http://10.0.2.2:3001/followings')
      .then(response => response.json())
      .then(json => {
        setFollowings(json);
      });
  }, [searchText]);

  const handleFollow = async (followingId: string) => {
    const response = await fetch('http://10.0.2.2:3001/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId || '',
        followingId,
      }),
    });

    if (response.ok) {
      // Handle successful follow
      setFollowings([
        ...followings,
        {user_id: userId, following_id: followingId},
      ]);
    } else {
      // Handle error
    }
  };

  const handleUnfollow = async (followingId: string) => {
    const response = await fetch('http://10.0.2.2:3001/follow/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId || '',
        followingId,
      }),
    });

    if (response.ok) {
      // Handle successful unfollow
      setFollowings(
        followings.filter(following => following.following_id !== followingId),
      );
    } else {
      // Handle error
    }
  };

  const renderItem = ({item}: {item: ItemProps}) => {
    const isFollowing = followings.some(
      following =>
        following.user_id.toString() === userId &&
        following.following_id === item.user_id,
    );

    return (
      <Item
        name={item.full_name}
        username={item.username}
        profile_picture_url={item.profile_picture_url}
        isFollowing={isFollowing}
        handleFollow={() => handleFollow(item.user_id)}
        handleUnfollow={() => handleUnfollow(item.user_id)}
      />
    );
  };

  return (
    <View style={[tw`flex-1 p-5`, {backgroundColor: '#002351'}]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.username}
      />
    </View>
  );
};

export default AccountScreen;
