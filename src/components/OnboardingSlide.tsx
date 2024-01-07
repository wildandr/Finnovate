// File: components/OnboardingSlide.tsx

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignUpButton from './SignUpButton';

interface OnboardingSlideProps {
  text: string;
  showButton?: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  text,
  showButton,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {showButton && <SignUpButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 105,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
  },
});

export default OnboardingSlide;
