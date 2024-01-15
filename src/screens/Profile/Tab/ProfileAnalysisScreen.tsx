import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FeedItem from '../../../components/FeedItem';
import PlusButton from '../../../components/PlusButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileAnalysisScreen = () => {
  const navigation = useNavigation();
  const [feedData, setFeedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const storeUserId = await AsyncStorage.getItem('user_id');
      const response = await fetch(
        `http://10.0.2.2:3001/users/${storeUserId}/posts-with-analysis`,
      );
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
  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <FlatList
        data={feedData as {post_id: number}[]}
        keyExtractor={item => item.post_id.toString()}
        renderItem={({item}) => <FeedItem item={item} />}
        style={tw`mt-5`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ProfileAnalysisScreen;
