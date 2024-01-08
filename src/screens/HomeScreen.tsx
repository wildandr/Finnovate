import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = () => {
  return (
    <View
      style={[
        tw`flex-1 justify-center items-center`,
        {backgroundColor: '#002351'},
      ]}>
      <View
        style={tw`flex-row justify-between items-center absolute w-full px-5 top-5`}>
        <Image source={require('../assets/Finnovate_logo_top.png')} />
        <View style={tw`flex-row`}>
          <Icon name="bell-o" size={24} color="white" style={tw`mr-3`} />
          <AntDesign name="setting" size={24} color="white" />
        </View>
      </View>
      <View
        style={[
          tw`absolute top-20 rounded-lg px-2 flex-row items-center mx-5`,
          {backgroundColor: '#00112B'},
        ]}>
        <Icon name="search" size={20} color="white" style={tw`left-1`} />
        <TextInput
          style={[tw`flex-1`, {color: 'white', paddingLeft: 20}]}
          placeholder=" Search feeds, trend"
          placeholderTextColor="white"
        />
      </View>
      <Text style={tw`text-white`}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
