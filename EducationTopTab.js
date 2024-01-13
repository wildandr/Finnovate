// TabNavigation.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Course from './src/screens/Education/Course';

const Tab = createMaterialTopTabNavigator();

const CustomTabLabel = ({ label, focused, color, style, fontSize }) => (
  <Text style={[style, { color, textTransform: 'none', fontSize }]}>{label}</Text>
);

const EducationTopTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarPressColor: 'rgba(255, 255, 255, 0)',
      tabBarPressOpacity: 0.5,
      tabBarIndicatorStyle: {
        height: null,
        top: '10%',
        bottom: '10%',
        width: '20%',
        left: '2.5%',
        borderRadius: 10,
        backgroundColor: '#2A476E',
      },
      tabBarStyle: {
        width: '100%',
        borderRadius: 1,
        backgroundColor: "#002351",
        elevation: 0,
      },
    })}
  >
    <Tab.Screen
      name="Discover"
      component={Course}
      initialParams={{ category: undefined }}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Discover" focused={focused} color={color} style={[tw``,]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Beginner"
      component={Course}
      initialParams={{ category: 'Beginner' }}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Beginner" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Moderate"
      component={Course}
      initialParams={{ category: 'Moderate' }}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Moderate" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Advanced"
      component={Course}
      initialParams={{ category: 'Advanced' }}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Advanced" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default EducationTopTab;
