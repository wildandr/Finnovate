import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MarketBottomTabs from '../../../MarketBottomTabs';
import goApiClient from '../../../server/goApiClient';
// import {LineChart, XAxis} from 'react-native-svg-charts';
// import {
//   VictoryChart,
//   VictoryLine,
//   VictoryTheme,
//   VictoryVoronoiContainer,
//   VictoryTooltip,
// } from 'victory-native';
import {LineChart} from 'react-native-wagmi-charts';

import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import {format, parseISO} from 'date-fns';

const DetailEquity = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [historicalData, setHistoricalData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const code = route.params?.code;

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await goApiClient.get(`/stock/idx/${code}/historical`);
        if (response.data && response.data.data && response.data.data.results) {
          setHistoricalData(response.data.data.results);
          console.log('Historical data:', historicalData);
        } else {
          console.error('Invalid price data:', response);
        }
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchHistoricalData();
  }, [code]);

  useEffect(() => {
    console.log('Historical data:', historicalData);
  }, [historicalData]);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await goApiClient.get(
          `/stock/idx/prices?symbols=${code}`,
        );
        setPriceData(response.data);
        console.log('Price data:', priceData);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPriceData();
  }, [code]);

  useEffect(() => {
    console.log('Price data:', priceData);
  }, [priceData]);

  let data;
  if (historicalData) {
    data = historicalData.map(item => ({
      timestamp: Date.parse(item.date),
      value: item.close,
    }));
  }
  console.log('Mapped data:', data);

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
        {priceData?.data?.results[0]?.symbol || 'Symbol not found'}
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

      <>
        {data && (
          <LineChart.Provider data={data}>
            <LineChart height={250}>
              <LineChart.Path color="#FFBC00">
                <LineChart.Gradient color="#FFBC00" />
              </LineChart.Path>
              <LineChart.CursorLine color="white" />
              <LineChart.CursorCrosshair color="white">
                <LineChart.Tooltip
                  cursorGutter={60}
                  xGutter={16}
                  yGutter={16}
                  textStyle={{
                    backgroundColor: 'black',
                    borderRadius: 4,
                    color: 'white',
                    fontSize: 18,
                    padding: 4,
                  }}
                />
                <LineChart.Tooltip
                  cursorGutter={60}
                  xGutter={16}
                  yGutter={16}
                  textStyle={{
                    backgroundColor: 'black',
                    borderRadius: 4,
                    color: 'white',
                    fontSize: 18,
                    padding: 4,
                  }}
                  position="bottom">
                  <LineChart.DatetimeText />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
            </LineChart>
          </LineChart.Provider>
        )}
      </>
      <MarketBottomTabs />
    </View>
  );
};

export default DetailEquity;
