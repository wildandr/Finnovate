// SplashScreen.tsx
import React, {useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        ...tw`flex-1 items-center justify-center`,
        backgroundColor: '#002351',
      }}>
      <Image source={require('../assets/finnovate_logo.png')} />
      <ActivityIndicator size="large" color="grey" style={tw`mt-10`} />
    </View>
  );
};

export default SplashScreen;
