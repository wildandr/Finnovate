import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface SignUpButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`h-16 w-96 rounded-lg justify-center items-center`,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={tw`text-white text-lg`}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBC00',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default SignUpButton;
