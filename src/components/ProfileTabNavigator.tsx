import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsScreen from '../screens/PostsScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import ProfilePostScreen from '../screens/Profile/Tab/ProfilePostScreen';
import ProfileAnalysisScreen from '../screens/Profile/Tab/ProfileAnalysisScreen';

const Tab = createMaterialTopTabNavigator();

function ProfileTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: '#FFF',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: '#002351'},
      }}>
      <Tab.Screen
        name="Posts"
        component={ProfilePostScreen}
        options={{tabBarLabel: 'Posts'}}
      />
      <Tab.Screen
        name="Analysis"
        component={ProfileAnalysisScreen}
        options={{tabBarLabel: 'Analysis'}}
      />
    </Tab.Navigator>
  );
}

export default ProfileTabNavigator;
