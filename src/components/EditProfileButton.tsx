// EditProfileButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface EditProfileButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void; // Add onPress prop
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ style, onPress }) => { // Add onPress to destructured props
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={[tw`w-28 h-8 rounded-full justify-center items-center`, { backgroundColor: '#7F91AB' }, style]}
      onPress={onPress} // Use onPress prop
    >
      <Text style={tw`text-white`}>Edit Profile</Text>
    </TouchableOpacity>
  );
};

export default EditProfileButton;