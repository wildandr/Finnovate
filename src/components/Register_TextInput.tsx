// /src/components/CustomTextInput.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const CustomTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput 
      style={[tw`p-2 mb-4 rounded-lg h-16 w-96`, {backgroundColor: '#001736', color: '#E5E7EB', paddingLeft: 20}]} 
      placeholderTextColor="#E5E7EB" 
      {...props} 
    />
  );
};

export default CustomTextInput;