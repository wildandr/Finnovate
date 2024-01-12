import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const PublishButton: React.FC = ({onPress}) => {
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`h-8 w-20 rounded-full justify-center items-center`,
      ]}
      onPress={handlePress}>
      <Text style={tw`text-white text-sm`}>Publish</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBC00',
  },
});

export default PublishButton;
