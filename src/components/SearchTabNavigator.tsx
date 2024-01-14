import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PopularScreen from '../screens/Search/PopularScreen';
import AccountScreen from '../screens/Search/AccountScreen';
import LatestScreen from '../screens/Search/LatestScreen';
import PostsScreen from '../screens/Search/PostsScreen';
import AnalysisScreen from '../screens/Search/AnalysisScreen';
const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={{
        tabBarActiveTintColor: '#FFF',
        tabBarLabelStyle: {fontSize: 10, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: '#002351'},
        tabBarIndicatorStyle: {backgroundColor: '#FFF'},
      }}>
      <Tab.Screen
        name="Popular"
        component={PopularScreen}
        options={{tabBarLabel: 'Popular'}}
      />
      <Tab.Screen
        name="Latest"
        component={LatestScreen}
        options={{tabBarLabel: 'Latest'}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{tabBarLabel: 'Account'}}
      />
      <Tab.Screen
        name="Post"
        component={PostsScreen}
        options={{tabBarLabel: 'Post'}}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{tabBarLabel: 'Analysis'}}
      />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
