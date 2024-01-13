// File: OnboardingScreen.tsx

import React from 'react';
import {View} from 'react-native';
import OnboardingComponent from '../../components/OnboardingComponent';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen: React.FC = () => {
  return (
    <View style={{backgroundColor: '#002351', flex: 1}}>
      <OnboardingComponent />
    </View>
  );
};

export default OnboardingScreen;
