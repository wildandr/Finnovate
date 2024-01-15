import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ItemProps {
  name: string;
  username: string;
  userId: number;
  followingId: number;
}

const Item = ({
  name,
  username,
  followingId,
  refreshFollowers,
}: ItemProps & {refreshFollowers: () => void}) => {
  const removeFollower = async () => {
    const storedUserId = await AsyncStorage.getItem('user_id');

    try {
      const response = await fetch('http://10.0.2.2:3001/follow/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: followingId,
          followingId: storedUserId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error deleting follower');
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
      }

      refreshFollowers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-row items-center mt-5`}>
      <Icon name="person-circle" size={50} color="white" />
      <View style={tw`ml-2`}>
        <Text style={tw`text-white text-lg font-bold`}>{name}</Text>
        <Text style={tw`text-yellow-400`}>@{username}</Text>
      </View>
      <TouchableOpacity
        style={tw`h-10 ml-auto border border-gray-500 p-2 rounded-lg`}
        onPress={removeFollower}>
        <Text style={tw`text-white mx-2`}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const storeUserId = await AsyncStorage.getItem('user_id');
    try {
      const response = await fetch(
        `http://10.0.2.2:3001/users/${storeUserId}/followers`,
      );
      const data = await response.json();
      setFollowers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshFollowers = () => {
    fetchData();
  };

  const renderItem = ({item}: {item: ItemProps}) => (
    <Item
      name={item.full_name}
      username={item.username}
      userId={1}
      followingId={item.user_id}
      refreshFollowers={refreshFollowers}
    />
  );

  return (
    <View style={[tw`flex-1 p-5`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold ml-28`}>Followers</Text>
      </View>
      <FlatList
        data={followers}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString()}
      />
    </View>
  );
};

export default FollowersScreen;
