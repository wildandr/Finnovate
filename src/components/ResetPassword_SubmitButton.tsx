// /src/components/SignUpButton.tsx
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SubmitButton: React.FC = () => {
  const handlePress = () => {
    // Add your logic here
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`h-16 w-96 rounded-lg justify-center items-center`,
      ]}
      onPress={handlePress}>
      <Text style={tw`text-white text-lg`}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBC00',
  },
});

export default SubmitButton;