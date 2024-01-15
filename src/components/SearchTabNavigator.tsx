import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PopularScreen from '../screens/Search/PopularScreen';
import AccountScreen from '../screens/Search/AccountScreen';
import LatestScreen from '../screens/Search/LatestScreen';
import PostsScreen from '../screens/Search/PostsScreen';
import AnalysisScreen from '../screens/Search/AnalysisScreen';
import SearchTextContext from '../contexts/SearchTextContext';

const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  const searchText = useContext(SearchTextContext);
  console.log('searchText:', searchText);

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
        initialParams={{searchText}}
      />
      <Tab.Screen
        name="Latest"
        component={LatestScreen}
        options={{tabBarLabel: 'Latest'}}
        initialParams={{searchText}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{tabBarLabel: 'Account'}}
        initialParams={{searchText}}
      />
      <Tab.Screen
        name="Post"
        component={PostsScreen}
        options={{tabBarLabel: 'Post'}}
        initialParams={{searchText}}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{tabBarLabel: 'Analysis'}}
        initialParams={{searchText}}
      />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
