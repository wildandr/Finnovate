import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'; // Import the useNavigation hook
import tw from 'tailwind-react-native-classnames';

interface ItemProps {
  name: string;
  username: string;
}

const Item = ({name, username}: ItemProps) => (
  <View style={tw`flex-row items-center mt-5`}>
    <Icon name="person-circle" size={50} color="white" />
    <View style={tw`ml-2`}>
      <Text style={tw`text-white text-lg font-bold`}>{name}</Text>
      <Text style={tw`text-yellow-400`}>@{username}</Text>
    </View>
    <TouchableOpacity
      style={tw`h-10 ml-auto border border-gray-500 p-2 rounded-lg`}>
      <Text style={tw`text-white mx-2`}>Remove</Text>
    </TouchableOpacity>
  </View>
);

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const userId = 1;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:3001/users/${userId}/followers`,
        );
        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}: {item: ItemProps}) => (
    <Item name={item.full_name} username={item.username} />
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
        keyExtractor={item => item.user_id.toString()}
      />
    </View>
  );
};

export default FollowersScreen;
