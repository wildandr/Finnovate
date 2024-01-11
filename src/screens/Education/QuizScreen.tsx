import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

// Importing the questions array
import { questions } from '../../data/question';

type ModalType = 'correctModal' | 'incorrectModal' | 'outOfTimeModal' | null;

const QuizScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [timer, setTimer] = useState(15); // Timer awal 15 detik
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<ModalType>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
 


  const startTimer = () => {
    setTimer(15); // Set ulang timer menjadi 15 detik
  
  };

 
const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const handleOptionPress = (optionId: number) => {
    setSelectedOptionId(optionId);
  
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;
    const correct = optionId === correctAnswerIndex;
    setIsCorrect(correct);
    setIsExplanationVisible(true);
    setIsModalVisible(correct ? 'correctModal' : 'incorrectModal');
   
  };
  
  const handleNextQuestion = () => {
    // Reset states for the next question
    setSelectedOptionId(null);
    setIsCorrect(false);
    setIsExplanationVisible(false);
    setIsModalVisible(null);
  
   startTimer();
    // Increment the current question index
    const nextQuestionIndex = currentQuestionIndex + 1;
  
    // Check if there are more questions
    if (nextQuestionIndex < questions.length) {
      // Move to the next question
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // No more questions, you can handle the end of the quiz here
      console.log("End of the quiz");
    }
  };
  

  const closeModal = () => {
    setIsModalVisible(null);
  };

  const CorrectModal = () => (
    <Modal
      isVisible={isModalVisible === 'correctModal'}
      onBackdropPress={closeModal}
      backdropOpacity={0}
      style={[tw`m-0`]}
    >
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="check-circle" size={24} color="#50CD89" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Great!
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextQuestion}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#50CD89' }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const IncorrectModal = () => (
    <Modal
      isVisible={isModalVisible === 'incorrectModal'}
      onBackdropPress={closeModal}
      backdropOpacity={0}
      style={[tw`m-0`]}
    >
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="times-circle" size={24} color="#F11B1B" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Oops! Wrong Answer.
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextQuestion}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#F11B1B' }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const OutOfTimeModal = () => (
    <Modal
      isVisible={isModalVisible === 'outOfTimeModal'}
      onBackdropPress={closeModal}
      backdropOpacity={0}
      style={[tw`m-0`]}
    >
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="clock-o" size={24} color="#FFD700" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Out of Time!
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleNextQuestion()}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#FFD700' }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  useEffect(() => {
    const myInterval = () => {
      setTimer((prevTimer) => {
        if (prevTimer > 0 && !isExplanationVisible) {
          // If timer is greater than 0 and explanation is not visible
          return prevTimer - 1;
        } else {
          if (isExplanationVisible) {
            // If the explanation is visible, stop the timer
            stopTimer();
            return prevTimer;
          }
          setIsExplanationVisible(true);
          setIsModalVisible('outOfTimeModal');
          return 15; // Reset the timer to 15 when it reaches 0
        }
      });
    };
  
    const timerInterval = setInterval(myInterval, 1000);
  
    // Clean up
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isExplanationVisible]);
  
  

  useEffect(() => {
    // Start the timer when the component is re-rendered (when it opens)
    startTimer();
  }, [currentQuestionIndex]); // Re-run the effect when currentQuestionIndex changes

  return (
    <View style={[tw`h-full`, { backgroundColor: '#FFFFFF' }]}>
      <View style={[tw`px-4 flex-row mt-4 items-center pb-2`]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="times" size={24} style={tw`text-black`} />
        </TouchableOpacity>
      </View>
      <Text style={[tw`px-4 text-black font-bold mb-2`, { fontSize: 20 }]}>
        {currentQuestion.question}
      </Text>
      <View style={[tw`w-full px-4`]}>
        {/* Display the image */}
        <Image
          source={{ uri: currentQuestion.image }}
          style={tw`w-full border border-gray-700 h-48 mt-5 mb-5`}
        />
      </View>
      {/* Changable View */}
      <View style={[tw`px-4`]}>
        {/* Paragraph of explanation that shows when the answer is correct */}
        {isExplanationVisible && (
          <Text style={[tw`text-black mb-2`, { fontSize: 16 }]}>
            {currentQuestion.explanation}
          </Text>
        )}
        {/* Display the options */}
        {!isExplanationVisible &&
          currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(index)}
              style={[
                tw`text-black border border-b-4 border-r-2 border-l-2 p-3 rounded-md mb-3`,
                {
                  fontSize: 16,
                  borderColor:
                    selectedOptionId === index
                      ? isCorrect
                        ? '#50CD89'
                        : '#F11B1B'
                      : '#7F91A8',
                },
              ]}>
              <Text>{option.answer}</Text>
            </TouchableOpacity>
          ))}
      </View>

      {/* Conditionally render the timer */}
      {!isExplanationVisible && (
        <Text style={[tw`text-black mt-2`, { fontSize: 16 }]}>
          Time remaining: {timer} seconds
        </Text>
      )}

      {isModalVisible === 'correctModal' && <CorrectModal />}
      {isModalVisible === 'incorrectModal' && <IncorrectModal />}
      {isModalVisible === 'outOfTimeModal' && <OutOfTimeModal />}
    </View>
  );
};

export default QuizScreen;
