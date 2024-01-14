import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { questions } from '../../data/question';
import LottieView from "lottie-react-native";

type RootStackParamList = {
  QuizResult: {
    correctAnswers: number;
    timeTaken: number;
  };
};

const QuizResult = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { correctAnswers, timeTaken } = route.params as RootStackParamList["QuizResult"];
  
  const [experience, setExperience] = useState(0);
  const maxExperience = 200;
  const expPerQuestion = maxExperience / questions.length;

  useEffect(() => {
    // Calculate total experience earned
    const totalExperience = correctAnswers * expPerQuestion;
    setExperience(totalExperience);
  }, [correctAnswers, expPerQuestion]);

  const handleGoBack = () => {
    navigation.navigate("EducationScreen");
  };

  return (
    <View style={[tw`px-4 h-full flex`, { backgroundColor: "#FFFFFF" }]}>
      <View style={[tw`flex-row mt-4 items-center pb-2`]}>
      </View>
      <View style={[tw`flex items-center mt-5`]}>
        <LottieView
          source={require("../../assets/astronaut.json")}
          autoPlay
          loop
          style={{ width: 300, height: 200 }}
        />
        <Text style={[tw` font-bold text-2xl mt-5`, {color:"#7F91A8"}]}>
          Fly me to the moon!
        </Text>
      </View>
      <View
        style={[
          tw`items-center text-black border border-b-4 border-r-4 border-l-2 px-3 py-5 rounded-md mt-5`,
          { borderColor: "#7F91A8" },
        ]}
      >
        <Text style={[tw`text-black font-bold text-2xl mb-4`]}>Result</Text>
        <View style={[tw`flex-row items-center justify-center `]}>
          <View style={[tw`flex items-center`]}>
            <Text style={[tw` font-semibold text-lg `, { color: "#7F91A8" }]}>
              Score
            </Text>
            <Text style={[tw`text-black mt-1 font-bold text-2xl`]}>{correctAnswers * 20}</Text>
          </View>
          <View style={[tw`flex items-center ml-4`]}>
            <Text style={[tw` font-semibold text-lg `, { color: "#7F91A8" }]}>
              Questions
            </Text>
            <Text style={[tw`text-black mt-1 font-bold text-2xl`]}>
              {correctAnswers} / {questions.length}
            </Text>
          </View>
          <View style={[tw`flex items-center ml-4`]}>
            <Text style={[tw` font-semibold text-lg `, { color: "#7F91A8" }]}>
              Exp
            </Text>
            <Text style={[tw`text-black mt-1 font-bold text-2xl`]}>{experience}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleGoBack} 
        style={[tw`mt-5 bg-blue-500 px-4 py-2 rounded-md border border-b-4 border-r-4 border-l-2`, { backgroundColor: "#FFBC00" }]}>
            <Text style={[tw`text-black font-semibold text-lg text-center`]}>Back to Course</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizResult;
