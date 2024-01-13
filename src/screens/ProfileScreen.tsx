import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Stat from '../components/StatistikProfile';
import EditProfileButton from '../components/EditProfileButton';
import ProfileTabNavigator from '../components/ProfileTabNavigator';
import tw from 'tailwind-react-native-classnames';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const PostsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Posts</Text>
  </View>
);

const AnalysisScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Analysis</Text>
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      const userId = 1;
      const response = await fetch(`http://10.0.2.2:3001/users/${userId}`);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }>
      <View style={styles.container}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.bannerImage}
            source={require('../assets/bgProfile.png')}
          />
          <Image
            source={require('../assets/avatar2.png')}
            style={{
              width: 90,
              height: 90,
              borderRadius: 30,
              position: 'absolute',
              bottom: -40,
              left: 10,
            }}
          />
        </View>
        <View style={tw`flex-row ml-52 w-60 mt-2`}>
          <Stat
            number={75}
            title="Win rate"
            onPress={() => {}}
            style={tw`mr-2`}
          />
          <Stat
            number={userData?.posts_count}
            title="Posts"
            onPress={() => {}}
            style={tw`mx-2`}
          />
          <Stat
            number={userData?.followers_count}
            title="Followers"
            style={tw`ml-2`}
            onPress={() => navigation.navigate('Followers')}
          />
        </View>
        <View style={tw`flex-row items-start mt-2 ml-4`}>
          <View style={tw`mr-4`}>
            <Text style={tw`text-xl font-bold text-white`}>
              {userData?.full_name}
            </Text>
            <Text style={tw`text-base text-yellow-400 font-bold`}>
              @{userData?.username}
            </Text>
            <Text style={tw`text-base text-white mt-2 mb-8`}>
              {userData?.description}
            </Text>
          </View>
          <View style={tw`flex-1 items-end`}>
            <EditProfileButton
              style={tw`mr-4`}
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>
        <ProfileTabNavigator />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001736',
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
});

export default ProfileScreen;
