// QuizOptions.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type QuizOptionProps = {
  option: string;
  onPress: () => void;
  isSelected: boolean;
  isCorrect: boolean;
};

const QuizOption: React.FC<QuizOptionProps> = ({ option, onPress, isSelected, isCorrect }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      tw`text-black border border-b-4 border-r-2 border-l-2 p-3 rounded-md mb-3`,
      {
        fontSize: 18,
        borderColor: isSelected ? (isCorrect ? '#50CD89' : '#F11B1B') : '#7F91A8',
      },
    ]}
  >
    <Text>{option}</Text>
  </TouchableOpacity>
);

export default QuizOption;
