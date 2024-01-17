import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MarketBottomTabs from '../../../MarketBottomTabs';
import goApiClient from '../../../server/goApiClient';
import {LineChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const DetailEquity = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [historicalData, setHistoricalData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const closePrices = historicalData?.data.results.map(item => item.close);
  const code = route.params?.code;

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await goApiClient.get(`/stock/idx/${code}/historical`);
        setHistoricalData(response.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [code]);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await goApiClient.get(
          `/stock/idx/prices?symbols=${code}`,
        );
        setPriceData(response.data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPriceData();
  }, [code]);

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#001D43'}]}>
      <View style={[tw`px-4 flex-row mt-4 items-center justify-between`]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} color="white" style={tw``} />
        </TouchableOpacity>
        <Icon name="star-o" size={24} color="white" style={tw`justify-end`} />
      </View>
      <Text
        style={[tw`mt-5 px-4 font-semibold`, {color: '#FFBC00', fontSize: 22}]}>
        {historicalData?.data?.results[0]?.symbol}
      </Text>
      <Text style={[tw`px-4`, {color: '#CBD5E1', fontSize: 14}]}>
        {priceData?.data?.results[0]?.company?.name ?? 'Name not found'}
      </Text>
      <View style={[tw`px-4 flex-row mt-3 items-center justify-between`]}>
        <Text style={[tw`text-white font-bold`, {fontSize: 32}]}>
          {priceData?.data?.results[0]?.close}
        </Text>
        <View style={[tw`flex-row items-center `]}>
          <Icon
            name={
              priceData?.data?.results[0]?.change_pct >= 0
                ? 'caret-up'
                : 'caret-down'
            }
            size={12}
            color={
              priceData?.data?.results[0]?.change_pct >= 0 ? '#50CD89' : 'red'
            }
            style={tw``}
          />
          <Text
            style={[
              tw` ml-1`,
              {
                color:
                  priceData?.data?.results[0]?.change_pct >= 0
                    ? '#50CD89'
                    : 'red',
                fontSize: 20,
              },
            ]}>
            {(priceData?.data?.results[0]?.change_pct ?? 0).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={[tw`px-4 `]}>
        {closePrices ? (
          <LineChart
            style={{height: 200}}
            data={closePrices}
            svg={{stroke: 'rgb(255, 188, 0)'}}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveNatural}></LineChart>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <MarketBottomTabs />
    </View>
  );
};

export default DetailEquity;
