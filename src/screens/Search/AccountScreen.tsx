import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'; // Import the useNavigation hook
import tw from 'tailwind-react-native-classnames';

interface ItemProps {
  name: string;
  username: string;
}

const DATA = [
  {
    id: '1',
    name: 'User 1',
    username: 'user1',
  },
  {
    id: '2',
    name: 'User 2',
    username: 'user2',
  },
  {
    id: '3',
    name: 'User 3',
    username: 'user3',
  },
  {
    id: '4',
    name: 'User 4',
    username: 'user4',
  },
  {
    id: '5',
    name: 'User 5',
    username: 'user5',
  },

  // Add more followers here
];

const Item = ({name, username}: ItemProps) => (
  <View style={tw`flex-row items-center mt-5`}>
    <Icon name="person-circle" size={50} color="white" />
    <View style={tw`ml-2`}>
      <Text style={tw`text-white text-lg font-bold`}>{name}</Text>
      <Text style={tw`text-yellow-400`}>@{username}</Text>
    </View>

    <TouchableOpacity
      style={tw`h-10 ml-auto border border-gray-500 p-2 rounded-lg bg-white`}>
      <Text style={tw`text-black mx-2`}>Follow</Text>
    </TouchableOpacity>
  </View>
);

const AccountScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object
  const renderItem = ({item}: {item: ItemProps}) => (
    <Item name={item.name} username={item.username} />
  );

  return (
    <View style={[tw`flex-1 p-5`, {backgroundColor: '#002351'}]}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AccountScreen;
