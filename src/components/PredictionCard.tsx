import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icons from 'react-native-vector-icons/AntDesign';
import {format} from 'date-fns';

const PredictionCard = ({analysis}) => {
  return (
    <View style={[tw`p-4 rounded-md mb-5`, {backgroundColor: '#2A476E'}]}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-white`}>Prediction - </Text>
        <Text
          style={
            analysis.prediction === 'Bullish'
              ? tw`text-green-500`
              : tw`text-red-500`
          }>
          {analysis.prediction}
        </Text>
      </View>
      <View style={tw`flex-row items-center mt-2`}>
        <Text
          style={[tw`text-white font-bold`, {fontSize: 22, fontStyle: 'bold'}]}>
          {analysis.symbol}
        </Text>
        <Text style={[tw`text-white text-center ml-2`, {fontSize: 10}]}>
          {analysis.equity_name}
        </Text>
      </View>
      <View style={tw`flex-row items-center mt-2`}>
        <Text
          style={[tw`text-white font-bold`, {fontSize: 32, fontStyle: 'bold'}]}>
          {analysis.target_price}
        </Text>
        <Text style={[tw`text-white text-center ml-2`, {fontSize: 10}]}>
          Target Price
        </Text>
      </View>
      <View style={tw`flex-row justify-between mt-2`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-white`}>Initial Price</Text>
          <Text style={tw`text-white`}>{analysis.initial_price}</Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-white`}>Upside</Text>
          <Text
            style={
              analysis.upside_percentage < 0
                ? tw`text-red-500`
                : tw`text-green-500`
            }>
            {analysis.upside_percentage}%
          </Text>
        </View>
        <View style={tw`items-center`}>
          <Text style={tw`text-white`}>Timing</Text>
          <Text style={tw`text-white`}>
            {format(new Date(analysis.timing), 'dd MMM yyyy')}
          </Text>
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
