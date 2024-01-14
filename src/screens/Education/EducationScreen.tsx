// EducationScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import EducationTopTab from '../../../EducationTopTab';

const EducationScreen = () => {
  return (
    <SafeAreaView style={[tw`flex-1  `, { backgroundColor: '#002351' }]}>
      <View style={[tw`px-4 mb-5`,]}>
        <View style={[tw` flex-row mt-7 items-center justify-between`,]}>
          <View style={[tw`flex-row`,]}>
            <Image source={require('../../assets/img1.jpg')} style={tw`w-14 h-14 rounded-full`} />
            <View style={[tw`ml-2 `,]}>
              <Text style={[tw`text-white font-semibold`, { fontSize: 18 }]}>Hi, Jasmine</Text>
              <Text style={[tw`text-white mt-1 font-light`, { fontSize: 14 }]}>Level 20 / 4000 xp</Text>
            </View>
          </View>
          <Icon name="ranking-star" size={24} color="white" style={tw`justify-end`} />
        </View>
        <Text style={[tw`text-white mt-5 font-semibold text-2xl tracking-wide`, {}]}>
          Dive into the World of Smart Investing with <Text style={[tw``, { color: '#FFBC00' }]}>Finnovate!</Text>
        </Text>
      </View>
   
      < EducationTopTab/>
 
    
    </SafeAreaView>
  );
};

export default EducationScreen;
