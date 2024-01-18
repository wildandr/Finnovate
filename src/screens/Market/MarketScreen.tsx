import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {equities} from '../../data/equities';
import Equity from '../../components/Equity';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsItem from '../../components/NewsItem';
import {ScrollView} from 'react-native-gesture-handler';
import sahamData from '../../data/saham.json';
import {useNavigation} from '@react-navigation/native';

const MarketScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [equitySymbol, setEquitySymbol] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const newSuggestions = sahamData.filter(
      saham =>
        saham.code.toLowerCase().includes(equitySymbol.toLowerCase()) ||
        saham.name.toLowerCase().includes(equitySymbol.toLowerCase()),
    );
    setSuggestions(newSuggestions);
  }, [equitySymbol]);

  const handleInputChange = value => {
    setEquitySymbol(value);
  };

  const handleSelectSuggestion = value => {
    setEquitySymbol(value);
    setSuggestions([]);
  };

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
    <ScrollView style={[tw``, {backgroundColor: '#002351'}]}>
      <SafeAreaView style={[tw`flex-1 px-4`, {backgroundColor: '#002351'}]}>
        <View
          style={[
            tw`mt-4 rounded-xl px-2 flex-row items-center `,
            {backgroundColor: '#00112B'},
          ]}>
          <Icon name="search" size={18} color="gray" style={tw`left-1`} />
          <TextInput
            value={equitySymbol}
            onChangeText={handleInputChange}
            placeholder=" Search equity"
            placeholderTextColor="gray"
            style={[tw`flex-1 text-white pl-4 pt-3`]}
          />
        </View>
        {equitySymbol !== '' && (
          <ScrollView
            style={[
              tw`border border-gray-500 border-2 rounded-2xl mt-2 border-gray-700`,
              styles.scrollView,
            ]}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.contentContainer}
            indicatorStyle="white">
            {suggestions.map(item => (
              <TouchableHighlight
                key={item.code}
                onPress={() => {
                  handleSelectSuggestion(item.code);
                  navigation.navigate('DetailEquity', {code: item.code});
                }}>
                <Text style={tw`p-2 text-white`}>
                  {item.code} - {item.name}
                </Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
        )}
        <Text style={tw`text-white mt-5 text-base font-medium`}>Favorite</Text>
        {equities.map((equity, index) => (
          <Equity key={index} equity={equity} />
        ))}
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
    </ScrollView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 200,
  },
  contentContainer: {
    padding: 10,
  },
});
