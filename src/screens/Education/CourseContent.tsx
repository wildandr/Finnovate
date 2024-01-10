import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const CourseContent = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[tw`h-full py-2`, {backgroundColor: '#FFFFFF'}]}>
      <ScrollView>
        <View
          style={[
            tw`px-4 flex-row mt-4 items-center pb-6 border-b border-gray-200`,
          ]}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} style={tw`text-black`} />
          </TouchableOpacity>
        </View>
        <View style={[tw`px-4 mt-5  `]}>
          <Text
            style={[
              tw`text-black font-semibold text-center mb-2 px-4`,
              {fontSize: 24},
            ]}>
            Understanding the Stock Market Landscape
          </Text>
          <Text style={[tw`text-black font-light text-center`, {fontSize: 14}]}>
            In this chapter, we will explore the intricate landscape of the
            stock market, delving into its key components, functions, and the
            diverse participants that shape its dynamics.
          </Text>
        </View>
        <TouchableOpacity onPress={handleGoBack}>
          <Text
            style={[
              tw`text-white rounded-md font-semibold text-center mb-2 mt-2 py-2 px-5 mx-auto`,
              {fontSize: 14, backgroundColor: '#FFBC00'},
            ]}>
            Start Quiz
          </Text>
        </TouchableOpacity>
        <View style={[tw`px-4 mt-3 text-left`]}>
          <Text style={[tw`text-black font-semibold  mb-2 `, {fontSize: 24}]}>
            Key Components of the Stock Market
          </Text>
          <FlatList
            data={[
              {
                key: 'Stock Exchanges: Explore the significance of stock exchanges as the primary platforms where buyers and sellers come together to trade stocks, and how they contribute to market transparency and liquidity.',
              },
              {
                key: 'Listed Companies: Understand the role of companies listed on the stock exchange, the process of going public through an Initial Public Offering (IPO), and the ongoing responsibilities of being a publicly traded entity.',
              },
              {
                key: 'Investors: Analyze the diverse range of participants in the stock market, from individual retail investors to institutional investors, and understand how their motivations and strategies influence market movements.',
              },
            ]}
            renderItem={({item, index}) => (
              <Text style={[tw`text-black  mb-2`, {fontSize: 14}]}>
                {index + 1}. {item.key}
              </Text>
            )}
          />
        </View>
        <View style={[tw`px-4 mt-5  `]}>
          <Text
            style={[
              tw`text-black font-semibold text-left mb-2`,
              {fontSize: 24},
            ]}>
            Unlocking Knowledge: Congratulations on Mastering [Topic]!
          </Text>
          <Text style={[tw`text-black font-light `, {fontSize: 14}]}>
            Congratulations on reaching this milestone! Now, let's elevate your
            understanding even further. Join our quiz and challenge yourself to
            solidify your grasp on [topic]. Embrace the opportunity to showcase
            your expertise and keep the learning momentum going. Happy
            exploring! 🌟
          </Text>
        </View>
        <TouchableOpacity onPress={handleGoBack}>
          <Text
            style={[
              tw`text-white rounded-md font-semibold text-center mb-2 mt-2 py-2 px-5 mx-auto`,
              {fontSize: 14, backgroundColor: '#FFBC00'},
            ]}>
            Start Quiz
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CourseContent;
