import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface PublishButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const PublishButton: React.FC<PublishButtonProps> = ({onPress, disabled}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress && onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        tw`h-8 w-20 rounded-full justify-center items-center`,
        disabled && styles.disabledButton,
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
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default PublishButton;
