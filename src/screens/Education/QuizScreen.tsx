import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

type QuizOption = {
  id: number;
  options: string;
  answer: string;
  isCorrect: number;
};

type Quiz = {
  id: number;
  question: string;
  image: string;
  explanation: string;
  options: Record<string, QuizOption>;
};

type ServerResponse = Record<string, Quiz>;

type RootStackParamList = {
  QuizResult: {
    correctAnswers: number;
    timeTaken: number;
  };
};

type QuizResultScreenRouteProp = RouteProp<RootStackParamList, 'QuizResult'>;
type QuizResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuizResult'>;

type Props = {
  route: QuizResultScreenRouteProp;
  navigation: QuizResultScreenNavigationProp;
};

type ModalType = 'correctModal' | 'incorrectModal' | 'outOfTimeModal' | null;

const QuizScreen: React.FC<Props> = ({ route, navigation }) => {
  const { materialId } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [timer, setTimer] = useState<number | null>(15);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<ModalType | false>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Quiz[]>([]);
  const currentQuestion = questions[currentQuestionIndex];
  const [isPlaying, setIsPlaying] = useState(true);
  const progressPercentage = Math.floor((currentQuestionIndex / questions.length) * 100);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const startTimer = () => {
    setTimer(15);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const handleOptionPress = (optionId: number) => {
    setSelectedOptionId(optionId);

    const correctAnswerIndex = Object.keys(currentQuestion.options).find(
      (key) => currentQuestion.options[key].isCorrect === 1
    );
    const correct = optionId === Number(correctAnswerIndex);
    setIsCorrect(correct);
    setIsExplanationVisible(true);
    setIsModalVisible(correct ? 'correctModal' : 'incorrectModal');

    if (correct) {
      setCorrectAnswersCount((count) => count + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsCorrect(false);
    setIsExplanationVisible(false);
    setIsModalVisible(false);

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      stopTimer();
      startTimer();
    } else if (nextQuestionIndex === questions.length) {
      setTimer(null);
      stopTimer();

      navigation.navigate('QuizResult', {
        correctAnswers: correctAnswersCount,
        timeTaken: calculateTimeTaken(),
      });
    }
  };

  const calculateTimeTaken = () => {
    return Math.floor((Date.now() - startTime) / 1000);
  };

  const closeModal = () => {
    setIsModalVisible(null);
  };

  const CorrectModal = () => (
    <Modal isVisible={isModalVisible === 'correctModal'} onBackdropPress={closeModal} backdropOpacity={0} style={[tw`m-0`]}>
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="check-circle" size={24} color="#50CD89" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Great!
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextQuestion}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#50CD89' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const IncorrectModal = () => (
    <Modal isVisible={isModalVisible === 'incorrectModal'} onBackdropPress={closeModal} backdropOpacity={0} style={[tw`m-0`]}>
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="times-circle" size={24} color="#F11B1B" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Oops! Wrong Answer.
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextQuestion}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#F11B1B' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const OutOfTimeModal = () => (
    <Modal isVisible={isModalVisible === 'outOfTimeModal'} onBackdropPress={closeModal} backdropOpacity={0} style={[tw`m-0`]}>
      <View style={[tw`bg-white p-4 rounded-md`, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <View style={[tw`flex-row items-center`]}>
          <Icon name="clock-o" size={24} color="#FFD700" style={tw``} />
          <Text style={[tw`text-black font-bold ml-3`, { fontSize: 18 }]}>
            Out of Time!
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleNextQuestion()}>
          <Text style={[tw`text-white font-semibold py-2 px-5 text-center rounded-lg mt-2`, { fontSize: 16, backgroundColor: '#FFD700' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  useEffect(() => {
    // Fetch data from the server
    fetch(`http://10.0.2.2:3001/materials/${materialId}/quizzes`)
      .then((response) => response.json())
      .then((data: ServerResponse) => {
        const serverQuestions = Object.values(data);
        setQuestions(serverQuestions);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
    startTimer();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const myInterval = () => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0 && !isExplanationVisible) {
          return prevTimer - 1;
        } else {
          if (isExplanationVisible) {
            stopTimer();
            return prevTimer;
          } else {
            setIsExplanationVisible(true);
            setIsModalVisible('outOfTimeModal');
            return 15;
          }
        }
      });
    };

    const nextQuestionIndex = currentQuestionIndex + 1;
    const timerInterval = setInterval(myInterval, 1000);

    if (nextQuestionIndex === questions.length) {
      return clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
      stopTimer();
    };
  }, [timer, isExplanationVisible]);

  return (
    <View style={[tw`h-full flex`, { backgroundColor: '#FFFFFF' }]}>
      {questions.length === 0 && <Text>Loading questions...</Text>}
      {questions.length > 0 && (
        <>
          <View style={[tw`px-4 flex-row mt-4 items-center pb-2`]}>
            <TouchableOpacity onPress={handleGoBack}>
              <Icon name="times" size={24} style={tw`text-black`} />
            </TouchableOpacity>
            <View
              style={[
                tw`w-full ml-2 flex-row items-center h-10 rounded-lg justify-center `,
                {
                  backgroundColor: 'white',
                },
              ]}
            >
              <Text
                style={[
                  tw``,
                  {
                    backgroundColor: '#FFBC00',
                    borderRadius: 12,
                    position: 'absolute',
                    left: 0,
                    height: 10,
                    right: 0,
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>
          </View>
          <Text style={[tw`px-4 text-black font-bold mb-2`, { fontSize: 20 }]}>
            {currentQuestion.question}
          </Text>
          <View style={[tw`w-full  flex items-center px-4`]}>
            {/* Display the image */}
            <Image source={{ uri: currentQuestion.image }} style={tw`w-full border border-gray-700 h-48 mt-5 mb-3`} />
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
              Object.keys(currentQuestion.options).map((key) => {
                const option = currentQuestion.options[key];
                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleOptionPress(option.id)}
                    style={[
                      tw`text-black border border-b-4 border-r-2 border-l-2 p-3 rounded-md mb-3`,
                      {
                        fontSize: 18,
                        borderColor:
                          selectedOptionId === option.id
                            ? isCorrect
                              ? '#50CD89'
                              : '#F11B1B'
                            : '#7F91A8',
                      },
                    ]}
                  >
                    <Text>{option.answer}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          {/* Conditionally render the timer */}
          {!isExplanationVisible && (
            <View style={[tw` px-4 absolute bottom-7 right-0`]}>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={15}
                size={60}
                trailColor="#FFFFFF"
                strokeWidth={6}
                colors={["#ffd04d", "#ffc933", "#ffc31a", "#FFBC00"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => ({ shouldRepeat: true, delay: 2 })}
                updateInterval={1}
              >
                {({ remainingTime, color }) => (
                  <Text style={[tw``, { fontSize: 16, color }]}>
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          )}

          {isModalVisible === 'correctModal' && <CorrectModal />}
          {isModalVisible === 'incorrectModal' && <IncorrectModal />}
          {isModalVisible === 'outOfTimeModal' && <OutOfTimeModal />}
        </>
      )}
    </View>
  );
};

export default QuizScreen;
