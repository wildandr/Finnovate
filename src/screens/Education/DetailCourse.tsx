import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const DetailCourse = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = () => {
    navigation.navigate("CourseContent");
  };
  return (
    <View style={[tw`h-full`, {backgroundColor: '#FFFFFF'}]}>
      <View
        style={[
          tw`px-4 flex-row mt-4 items-center pb-6 border-b border-gray-200`,
        ]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} style={tw`text-black`} />
        </TouchableOpacity>
        <Text
          style={[
            tw`w-full text-center text-black font-medium`,
            {fontSize: 24},
          ]}>
          Course Detail
        </Text>
      </View>
      <ScrollView>
      <Image
        source={require('../../assets/course1.png')}
        style={tw`w-48 mt-5 h-40 mx-auto `}
      />
      <View style={[tw`px-5 mt-5  `]}>
        <Text
          style={[
            tw`text-black font-semibold text-center mb-2`,
            {fontSize: 24},
          ]}>
          Stock Fundamental
        </Text>
        <Text style={[tw`text-black font-light text-center`, {fontSize: 14}]}>
          Dive into the world of stock fundamentals with our comprehensive
          course, where you'll unravel the intricacies of financial statements,
          valuation techniques, and market analysis.
        </Text>
      </View>
      <View style={[tw`px-4 py-5 mt-3 `, {backgroundColor: '#F3F4F6'}]}>
        <Text
          style={[
            tw`text-black font-medium text-center mb-2 mt-2 px-10`,
            {fontSize: 20},
          ]}>
          Introduction to Stock Market Basics
        </Text>
        <TouchableOpacity onPress={handlePress}>
        <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
        <Text style={[tw`text-white px-3 py-2 rounded-full`, { fontSize: 16, backgroundColor:'#CEF2FF', color:'#007BFF' }]}>
                    01
                    </Text>
        <Text style={[tw`text-black text-center w-11/12 text-left ml-2`, {fontSize: 16}]}>
        Understanding the Stock Market Landscape
        </Text>  
        </View>
        </TouchableOpacity>
        <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
        <Text style={[tw`text-white px-3 py-2 rounded-full`, { fontSize: 16, backgroundColor:'#CEF2FF', color:'#007BFF' }]}>
                    02
                    </Text>
        <Text style={[tw`text-black text-center w-11/12 text-left ml-2`, {fontSize: 16}]}>
        Understanding the Stock Market International
        </Text>
                
        </View>
        <Text
          style={[
            tw`text-black font-medium text-center mb-2 mt-5 px-10`,
            {fontSize: 20},
          ]}>
          Introduction to Stock Market Advance
        </Text>
        <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
        <Text style={[tw`text-white px-3 py-2 rounded-full`, { fontSize: 16, backgroundColor:'#CEF2FF', color:'#007BFF' }]}>
                    01
                    </Text>
        <Text style={[tw`text-black text-center w-11/12 text-left ml-2`, {fontSize: 16}]}>
        Understanding the Stock Market Landscape
        </Text>
                
        </View>
        <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
        <Text style={[tw`text-white px-3 py-2 rounded-full`, { fontSize: 16, backgroundColor:'#CEF2FF', color:'#007BFF' }]}>
                    02
                    </Text>
        <Text style={[tw`text-black text-center w-11/12 text-left ml-2`, {fontSize: 16}]}>
        Understanding the Stock Market International
        </Text>
                
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default DetailCourse;
