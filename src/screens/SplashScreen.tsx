// File: src/screens/SplashScreen.tsx

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000); // Adjust delay as needed

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [navigation]);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
