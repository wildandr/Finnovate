import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {Link} from 'react-router-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import DetailEquity from './DetailEquity';
import {equities} from '../../data/equities';
import Equity from '../../components/Equity';
import {SafeAreaView} from 'react-native-safe-area-context';

const MarketScreen = () => {
  return (
    <SafeAreaView style={[tw`flex-1 px-4`, {backgroundColor: '#002351'}]}>
      <View
        style={[
          tw`mt-4 rounded-xl px-2 flex-row items-center `,
          {backgroundColor: '#00112B'},
        ]}>
        <Icon name="search" size={18} color="gray" style={tw`left-1`} />
        <TextInput
          style={[tw`flex-1 text-white pl-4 pt-3`]}
          placeholder=" Search equity"
          placeholderTextColor="gray"
        />
      </View>
      {/* Favorite */}
      <Text style={tw`text-white mt-5 text-base font-medium`}>Favorite</Text>
      {/* Show Equity */}
      {equities.map((equity, index) => (
        <Equity key={index} equity={equity} />
      ))}
      {/* Latest news */}
      <Text style={tw`text-white mt-14 text-base font-medium`}>
        Latest news
      </Text>
      <View style={[tw` flex-row mt-3 items-center `]}>
        <Image
          source={require('../../assets/img1.jpg')}
          style={tw`w-16 h-16 rounded-lg`}
        />
        <View style={[tw`ml-2 w-3/4`]}>
          <Text
            style={[
              tw`text-white font-semibold`,
              {color: '#FFBC00', fontSize: 7},
            ]}>
            4 Jan 2024
          </Text>
          <Text
            style={[
              tw`text-white font-bold mt-1`,
              {color: 'white', fontSize: 12, flexShrink: 1},
            ]}>
            Insurtech startup PasarPolis gets $54 million — Series B
          </Text>
          <Text style={[tw`text-white `, {color: '#CBD5E1', fontSize: 8}]}>
            Insurtech startup PasarPolis gets $54 million — Series B
          </Text>
        </View>
      </View>
      <View style={[tw` flex-row mt-3 items-center `]}>
        <Image
          source={require('../../assets/img1.jpg')}
          style={tw`w-16 h-16 rounded-lg`}
        />
        <View style={[tw`ml-2 w-3/4`]}>
          <Text
            style={[
              tw`text-white font-semibold`,
              {color: '#FFBC00', fontSize: 7},
            ]}>
            4 Jan 2024
          </Text>
          <Text
            style={[
              tw`text-white font-bold mt-1`,
              {color: 'white', fontSize: 12, flexShrink: 1},
            ]}>
            Insurtech startup PasarPolis gets $54 million — Series B
          </Text>
          <Text style={[tw`text-white `, {color: '#CBD5E1', fontSize: 8}]}>
            Insurtech startup PasarPolis gets $54 million — Series B
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MarketScreen;
