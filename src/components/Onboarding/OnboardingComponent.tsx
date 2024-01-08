import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, View, StyleSheet} from 'react-native';
import OnboardingSlide from './OnboardingSlide';

const OnboardingComponent: React.FC = () => {
  const text =
    'Just by watching a video about your favorite stocks and completing a short quiz to test your knowledge, you’ll be rewarded with a bit of that specific stocks';

  const pages = [
    {
      backgroundColor: 'transparent',
      image: <Image source={require('../../assets/onboarding1.png')} />,
      title: 'Stocks is god',
      subtitle: <OnboardingSlide text={text} />,
    },
    {
      backgroundColor: 'transparent',
      image: (
        <View style={styles.slideContainer}>
          <Image source={require('../../assets/onboarding2.png')} />
        </View>
      ),
      title: 'Stocks is god',
      subtitle: <OnboardingSlide text={text} showButton />,
    },
  ];

  return (
    <Onboarding
      showNext={false}
      showSkip={false}
      bottomBarHighlight={false}
      bottomBarHeight={60}
      pages={pages}
    />
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    marginTop: 100,
  },
});

export default OnboardingComponent;
