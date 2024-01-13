// /src/components/SignUpButton.tsx
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`h-16 w-3/4 rounded-lg justify-center items-center`,
      ]}
      onPress={onPress}>
      <Text style={tw`text-white text-lg`}>Sign In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBC00',
  },
});

export default LoginButton;
