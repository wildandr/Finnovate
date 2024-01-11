import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icons from 'react-native-vector-icons/AntDesign';

const PredictionCard = () => {
  return (
    <View style={[tw`p-4 rounded-md mb-5`, {backgroundColor: '#2A476E'}]}>
      <Text style={tw`text-white`}>Prediction - <Text style={tw`text-green-500`}>Bullish</Text></Text>
      <View style={tw`flex-row items-center mt-2`}>
        <Text style={[tw`text-white font-bold`, {fontSize: 22, fontStyle: 'bold'}]}>GOTO</Text>
        <Text style={[tw`text-gray-500 text-center ml-2`, {fontSize: 10}]}>GoTo Gojek Tokopedia Tbk</Text>
        </View>
        <View style={tw`flex-row items-center mt-2`}>
            <Text style={[tw`text-white font-bold`, {fontSize: 32, fontStyle: 'bold'}]}>3,123</Text>
            <Text style={[tw`text-white text-center ml-2`, {fontSize: 10}]}>Target Price</Text>
        </View>
        <View style={tw`flex-row justify-between mt-2`}>
        <View style={tw`items-center`}>
            <Text style={tw`text-white`}>Initial Price</Text>
            <Text style={tw`text-white`}>2,500</Text>
        </View>
        <View style={tw`items-center`}>
            <Text style={tw`text-white`}>Upside</Text>
            <Text style={tw`text-green-500`}>+40,23%</Text>
        </View>
        <View style={tw`items-center`}>
            <Text style={tw`text-white`}>Timing</Text>
            <Text style={tw`text-white`}>6 Jan 2024</Text>
        </View>
        </View>
      <View style={tw`flex-row mt-2`}>
        <TouchableOpacity style={tw`flex-row items-center`}>
          <Icons name="downcircle" size={24} color="red" />
          <Text style={tw`text-white ml-2`}>Disagree</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center ml-4`}>
          <Icons name="upcircle" size={24} color="green" />
          <Text style={tw`text-white ml-2`}>Agree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PredictionCard;