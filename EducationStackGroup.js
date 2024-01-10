import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Course from './src/screens/Education/Course';
import DetailCourse from './src/screens/Education/DetailCourse';
import EducationScreen from './src/screens/Education/EducationScreen';

const EducationStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
const CustomTabLabel = ({ label, focused, color, style, fontSize }) => (
  <Text style={[style, { color, textTransform: 'none', fontSize }]}>{label}</Text>
);

const TabNavigator = () => (
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
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Discover" focused={focused} color={color} style={[tw``,]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Beginner"
      component={Course}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Beginner" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Moderate"
      component={Course}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Moderate" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
    <Tab.Screen
      name="Advanced"
      component={Course}
      options={{
        tabBarLabel: ({ focused, color }) => (
          <CustomTabLabel label="Advanced" focused={focused} color={color} style={[tw``]} fontSize={14} />
        ),
      }}
    />
  </Tab.Navigator>
);

function EducationStackGroup() {
  return (
    <EducationStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <EducationStack.Screen name="EducationScreen" component={EducationScreen} />
    
      <EducationStack.Screen name="DetailCourse" component={DetailCourse} />
    </EducationStack.Navigator>
  );
}

export default EducationStackGroup;
