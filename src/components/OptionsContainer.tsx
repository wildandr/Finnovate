// OptionsContainer.tsx
import React from 'react';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import QuizOption from './QuizOptions';

type OptionsContainerProps = {
  options: string[];
  onPress: (index: number) => void;
  selectedOptionId: number | null;
  isCorrect: boolean;
};

const OptionsContainer: React.FC<OptionsContainerProps> = ({
  options,
  onPress,
  selectedOptionId,
  isCorrect,
}) => (
  <View style={[tw`px-4`]}>
    {options.map((option, index) => (
      <QuizOption
        key={index}
        option={option}
        onPress={() => onPress(index)}
        isSelected={selectedOptionId === index}
        isCorrect={isCorrect}
      />
    ))}
  </View>
);

export default OptionsContainer;
