import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SignUpButton: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Splash');
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
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
