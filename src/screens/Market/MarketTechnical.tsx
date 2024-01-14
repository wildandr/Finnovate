import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import tw from 'tailwind-react-native-classnames';

const MarketTechnical = () => {
  return (
    <View style={[tw`h-full `, {backgroundColor: '#002351'}]}>
      <ScrollView>
        <Text style={[tw`mt-4 text-white font-semibold px-4`, {fontSize: 16}]}>
          Price History Technical Prediction
        </Text>
        <View style={[tw`px-4`]}>
          <Image
            source={require('../../assets/chart.png')}
            style={[tw`px-4 w-full border h-64 mt-5 mb-5`]}
          />
        </View>
        <View style={[tw`flex-row px-4  items-center`]}>
          <Text style={[tw` text-white font-medium `, {fontSize: 12}]}>
            Method :{' '}
          </Text>
          <Text style={[tw`text-white font-medium `, {fontSize: 12}]}>
            ARIMA
          </Text>
        </View>
        <View style={[tw`px-4 w-1/2`]}>
          <TouchableOpacity
            style={[tw`py-2 mt-3 rounded-md`, {backgroundColor: '#7F91A8'}]}
            onPress={() => {
              // Handle button press
            }}>
            <Text style={[tw`text-white text-center font-bold`]}>
              Custom Method
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[tw`mt-4 mb-10`]}>
          <Text style={[tw` text-white font-semibold px-4`, {fontSize: 16}]}>
            Description
          </Text>
          <Text style={[tw`mt-4 text-white px-4`, {fontSize: 12}]}>
            Lorem ipsum dolor sit amet consectetur. Viverra eleifend lorem leo
            in tempor tristique amet senectus. Pulvinar nulla ultricies quam
            vulputate sed. Nibh amet senectus augue in ut. Dictumst turpis
            ultricies at pellentesque neque augue arcu semper.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MarketTechnical;
