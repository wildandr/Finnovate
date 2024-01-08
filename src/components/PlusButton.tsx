// Import statement
import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

// Definisikan properti onPress
interface PlusButtonProps {
  onPress: () => void;
}

// Gunakan properti onPress dalam fungsi komponen
const PlusButton: React.FC<PlusButtonProps> = ({ onPress }) => (
  <TouchableOpacity 
    style={[tw`items-center justify-center w-14 h-14 rounded-full absolute bottom-5 right-5`, { backgroundColor: '#FFBC00' }]}
    onPress={onPress} // Gunakan onPress yang diteruskan
  >
    <Icon name="plus" size={28} color="black" />
  </TouchableOpacity>
);

export default PlusButton;
