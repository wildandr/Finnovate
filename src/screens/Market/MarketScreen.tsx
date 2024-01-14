import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {equities} from '../../data/equities';
import Equity from '../../components/Equity';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsItem from '../../components/News';

const MarketScreen = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          'https://berita-indo-api-next.vercel.app/api/cnbc-news/market',
        );
        const data = await response.json();

        if (data && data.data) {
          const latestNews = data.data.slice(0, 10);
          setNewsData(latestNews);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

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
      <FlatList
        data={newsData}
        renderItem={({item}) => <NewsItem item={item} />}
        keyExtractor={item => item.title}
        style={tw`mb-2`}
      />
    </SafeAreaView>
  );
};

export default MarketScreen;
