import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native'; // Import View, Text, TouchableOpacity
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon

interface CustomTextInputProps extends TextInputProps {
  isPassword?: boolean; // Add this line
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ isPassword, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry); // Add this line

  return (
    <View style={tw`flex-row items-center`}>
      <TextInput 
        style={[tw`p-2 mb-4 rounded-lg h-16 flex-1`, {backgroundColor: '#001736', color: '#E5E7EB', paddingLeft: 20}]} // Add flex-1 here
        placeholderTextColor="#E5E7EB" 
        secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry} // Modify this line
        {...props} 
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#E5E7EB" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
