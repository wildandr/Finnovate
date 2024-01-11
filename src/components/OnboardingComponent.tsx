// File: components/OnboardingComponent.tsx

import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, View, StyleSheet} from 'react-native';
import OnboardingSlide from './OnboardingSlide';
import {useNavigation} from '@react-navigation/native';

const OnboardingComponent: React.FC = () => {
  const text =
    'Just by watching a video about your favorite stocks and completing a short quiz to test your knowledge, you’ll be rewarded with a bit of that specific stocks';

  const navigation = useNavigation();

  return (
    <Onboarding
      showNext={false}
      showSkip={true}
      bottomBarHighlight={false}
      bottomBarHeight={60}
      onSkip={() => navigation.navigate('Register')}
      pages={[
        {
          backgroundColor: 'transparent',
          image: <Image source={require('../assets/onboarding1.png')} />,
          title: 'Welcome to Finnovate',
          subtitle: (
            <OnboardingSlide text="Dive into a cutting-edge social media hub for traders, offering AI predictions, market insights, and gamified learning" />
          ),
        },
        {
          backgroundColor: 'transparent',
          image: (
            <View style={styles.slideContainer2}>
              <Image source={require('../assets/onboarding2.png')} />
            </View>
          ),
          title: 'Dive into Dynamic Market Watch',
          subtitle: (
            <OnboardingSlide text="Explore live market data through technical and fundamental analyses for informed trading decisions" />
          ),
        },
        {
          backgroundColor: 'transparent',
          image: (
            <View style={styles.slideContainer3}>
              <Image source={require('../assets/onboarding2.png')} />
            </View>
          ),
          title: 'Level Up with Gamified Education',
          subtitle: (
            <OnboardingSlide
              text="Immerse in a gamified educational hub, turning trading education into an exciting journey"
              showButton
            />
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  slideContainer2: {
    marginTop: 40, // Adjust this value as needed
  },
  slideContainer3: {
    marginTop: 100, // Adjust this value as needed
  },
});

export default OnboardingComponent;
