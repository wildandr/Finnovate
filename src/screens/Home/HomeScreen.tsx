import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from '../../components/FeedItem';
import PlusButton from '../../components/PlusButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [feedData, setFeedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://10.0.2.2:3001/posts');
      const data = await response.json();
      const sortedData = data.sort(
        (a: any, b: any) =>
          Number(new Date(b.date_created)) - Number(new Date(a.date_created)),
      );
      setFeedData(sortedData);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const filteredData = feedData.filter(
    (item: any) =>
      (item.caption &&
        item.caption.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.username &&
        item.username.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.analysis &&
        item.analysis.symbol &&
        item.analysis.symbol
          .toLowerCase()
          .includes(searchText.toLowerCase())) ||
      (item.analysis &&
        item.analysis.full_name &&
        item.analysis.full_name
          .toLowerCase()
          .includes(searchText.toLowerCase())),
  );
  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View
        style={tw`flex-row justify-between items-center absolute w-full px-5 top-5`}>
        <Image source={require('../../assets/Finnovate_logo_top.png')} />
        <View style={tw`flex-row`}>
          <TouchableOpacity>
            <Icon name="bell-o" size={24} color="white" style={tw`mr-3`} />
          </TouchableOpacity>
          <Icon name="cog" size={24} color="white" />
        </View>
      </View>
      <View
        style={[
          tw`absolute top-20 rounded-lg px-2 flex-row items-center mx-5`,
          {backgroundColor: '#00112B'},
        ]}>
        <Icon name="search" size={20} color="white" style={tw`left-1`} />
        <TextInput
          style={[tw`flex-1`, {color: 'white', paddingLeft: 20}]}
          placeholder=" Search feeds, trend"
          placeholderTextColor="white"
          onChangeText={text => setSearchText(text)}
        />
      </View>

      <FlatList
        data={filteredData as {post_id: number}[]}
        keyExtractor={item => item.post_id.toString()}
        renderItem={({item}) => <FeedItem item={item} />}
        style={tw`mt-40`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <PlusButton onPress={() => navigation.navigate('Publish')} />
    </View>
  );
};

export default HomeScreen;
