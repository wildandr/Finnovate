import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SignUpButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`h-16 w-96 rounded-md justify-center items-center`,
      ]}>
      <Text style={tw`text-white text-lg`}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7F91AB',
  },
});

export default SignUpButton;
