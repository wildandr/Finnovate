import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NewsItem from '../../components/NewsItem';


const News = () => {
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
    <View style={[tw`flex-1 `, {backgroundColor: '#002351'}]}>
       <FlatList
        data={newsData}
        renderItem={({item}) => <NewsItem item={item} />}
        keyExtractor={item => item.title}
        style={tw`mb-2 px-2`}
      />
    </View>
  );
}

export default News;