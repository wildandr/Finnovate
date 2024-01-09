import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from '../components/FeedItem';
import PlusButton from '../components/PlusButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
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
      <View style={tw`flex-row justify-between items-center absolute w-full px-5 top-5`}>
        <Image source={require('../assets/Finnovate_logo_top.png')} />
        <View style={tw`flex-row`}>
          <Icon name="bell-o" size={24} color="white" style={tw`mr-3`} />
          <Icon name="cog" size={24} color="white" />
        </View>
      </View>
      <View style={[tw`absolute top-20 rounded-lg px-2 flex-row items-center mx-5`, { backgroundColor: '#00112B' }]}>
        <Icon name="search" size={20} color="white" style={tw`left-1`} />
        <TextInput style={[tw`flex-1`, { color: 'white', paddingLeft: 20 }]} placeholder=" Search feeds, trend" placeholderTextColor="white" />
      </View>

      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem item={item} />}
        style={tw`mt-40`}
      />
      {/* Menggunakan PlusButton dan meneruskan fungsi onPress */}
      <PlusButton onPress={() => {}} />
    </View>
  );
};

export default HomeScreen;