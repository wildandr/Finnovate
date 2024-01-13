import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from '../components/FeedItem';
import PlusButton from '../components/PlusButton';
import { useNavigation } from '@react-navigation/native';

const PopularScreen = () => {
  const navigation = useNavigation();
  const feedData = [
    {
      id: '1',
      username: 'JohnDoe',
      timestamp: '1 jam yang lalu',
      text: 'Ini adalah feed pertama. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '2',
      username: 'JaneSmith',
      timestamp: '2 jam yang lalu',
      text: 'Ini adalah feed kedua. Ut enim ad minim veniam.',
      image: require('../assets/onboarding1.png'),
    },
    // ... tambahkan data feed lainnya sesuai kebutuhan
  ];


  return (
    <View style={[tw`flex-1`, { backgroundColor: '#002351' }]}>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem item={item} />}
        style={tw`mt-8`}
      />
    </View>
  );
};

export default PopularScreen;