import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MarketScreen from './src/screens/Market/MarketScreen';
import EducationScreen from './src/screens/Education/EducationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DetailEquity from './src/screens/Market/DetailEquity';
import News from './src/screens/Market/News';
import MarketTechnical from './src/screens/Market/MarketTechnical';
import MarketFundamental from './src/screens/Market/MarketFundamental';
import Course from './src/screens/Education/Course';
import DetailCourse from './src/screens/Education/DetailCourse';

// Stack
const Stack = createStackNavigator();

function StackGroup() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// Top Tabs

//Education Top Tabs
const EducationTab = createMaterialTopTabNavigator();

const CustomTabLabel = ({ label, focused, color, style, fontSize }) => (
  <Text style={[style, { color, textTransform: 'none', fontSize }]}>{label}</Text>
);

const EducationTopTabs = () => {
  return (
    <EducationTab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        indicatorStyle: {
          height: null,
          top: '10%',
          bottom: '10%',
          width: '20%',
          left: '2.5%',
          borderRadius: 10,
          backgroundColor: '#2A476E',
        },
        style: {
          width: '100%',
          borderRadius: 1,
          backgroundColor: "#002351",
          elevation: 0,
        },
        tabStyle: {
          borderRadius: 10,
        },
      }}>
      <EducationTab.Screen
        name="Discover"
        component={Course}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel label="Discover" focused={focused} color={color} style={[tw``,]} fontSize={14} />
          ),
        }}
      />
      <EducationTab.Screen
        name="Beginner"
        component={Course}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel label="Beginner" focused={focused} color={color} style={[tw``]} fontSize={14} />
          ),
        }}
      />
      <EducationTab.Screen
        name="Moderate"
        component={Course}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel label="Moderate" focused={focused} color={color} style={[tw``]} fontSize={14} />
          ),
        }}
      />
      <EducationTab.Screen
        name="Advanced"
        component={Course}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel label="Advanced" focused={focused} color={color} style={[tw``]} fontSize={14} />
          ),
        }}
      />
    </EducationTab.Navigator>
  );
}

//Education Stack
const EducationStack = createStackNavigator();

function EducationStackGroup() {
  return (
    <EducationStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <EducationStack.Screen name="EducationScreen" component={EducationScreen} />
      <EducationStack.Screen name="DetailCourse" component={DetailCourse} />
    </EducationStack.Navigator>
  );
}

// Market Stack
const MarketStack = createStackNavigator();

function MarketStackGroup() {
  return (
    <MarketStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MarketStack.Screen name="MarketScreen" component={MarketScreen} />
      <MarketStack.Screen name="DetailEquity" component={DetailEquity} />
    </MarketStack.Navigator>
  );
}

// Bottom Tab
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#00112B',
          height: 70,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketStackGroup}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="line-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Education"
        component={EducationStackGroup}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
     <BottomTabNavigator />
    </NavigationContainer>
  );
}
