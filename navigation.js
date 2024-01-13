import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SplashScreen from './src/screens/Root/SplashScreen';
import OnboardingScreen from './src/screens/Auth/OnboardingScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import ResetPasswordScreen from './src/screens/Profile/ResetPasswordScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import HomeScreen from './src/screens/Home/HomeScreen';
import MarketScreen from './src/screens/Market/MarketScreen';
import EducationScreen from './src/screens/Education/EducationScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DetailEquity from './src/screens/Market/DetailEquity';
import News from './src/screens/Market/News';
import MarketTechnical from './src/screens/Market/MarketTechnical';
import MarketFundamental from './src/screens/Market/MarketFundamental';
import Course from './src/screens/Education/Course';
import DetailCourse from './src/screens/Education/DetailCourse';

import PublishScreen from './src/screens/Home/PublishScreen';
import CourseContent from './src/screens/Education/CourseContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuizScreen from './src/screens/Education/QuizScreen';
import QuizResult from './src/screens/Education/QuizResult';
import EditProfileScreen from './src/screens/Profile/EditProfileScreen';
import FollowersScreen from './src/screens/Profile/FollowersScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Splash" component={SplashScreen} />
    <RootStack.Screen name="OnBoarding" component={OnboardingScreen} />
    <RootStack.Screen name="Register" component={RegisterScreen} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Home" component={BottomTabNavigator} />
  </RootStack.Navigator>
);

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

//Education Stack
const EducationStack = createStackNavigator();

function EducationStackGroup() {
  return (
    <EducationStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <EducationStack.Screen
        name="EducationScreen"
        component={EducationScreen}
      />
      <EducationStack.Screen name="DetailCourse" component={DetailCourse} />
      <EducationStack.Screen name="CourseContent" component={CourseContent} />
      <EducationStack.Screen name="QuizScreen" component={QuizScreen} />
      <EducationStack.Screen name="QuizResult" component={QuizResult} />
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
      <MarketStack.Screen
        name="DetailEquity"
        component={DetailEquity}
        options={{presentation: 'fullScreenModal'}}
      />
    </MarketStack.Navigator>
  );
}

// Home Stack
const HomeStack = createStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Publish" component={PublishScreen} />
    </HomeStack.Navigator>
  );
}

// Profile Stack
const ProfileStack = createStackNavigator();

function ProfileStackGroup() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Followers" component={FollowersScreen} />
    </ProfileStack.Navigator>
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
        component={HomeStackGroup}
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
        component={ProfileStackGroup}
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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    // command untuk skip login
    const checkLoginStatus = async () => {
      // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      // setIsLoggedin(isLoggedIn === 'true');
      // setIsLoading(false);
      const isLoggedIn = true;

      setIsLoggedin(isLoggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const logout = async () => {
    // command untuk skip login
    await AsyncStorage.removeItem('isLoggedIn');

    setIsLoggedin(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedin ? (
        <BottomTabNavigator logout={logout} />
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}
