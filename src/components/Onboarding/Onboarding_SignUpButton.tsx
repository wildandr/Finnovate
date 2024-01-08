import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const SignUpButton: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        tw`h-16 w-96 rounded-lg justify-center items-center`,
      ]}>
      <Text style={tw`text-white text-lg`}>Get Started</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBC00',
  },
});

export default SignUpButton;
