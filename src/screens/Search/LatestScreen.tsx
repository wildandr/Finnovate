import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FeedItem from '../../components/FeedItem';
import {useNavigation} from '@react-navigation/native';

const LatestScreen = ({route}) => {
  const navigation = useNavigation();
  const searchText = route.params.searchText;
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch(
      `http://10.0.2.2:3001/search-latest?searchTerm=${encodeURIComponent(
        searchText,
      )}`,
    )
      .then(response => response.json())
      .then(data => setFeedData(data))
      .catch(error => console.error(error));
  }, [searchText]);

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <FlatList
        data={feedData}
        keyExtractor={item => item.post_id.toString()}
        renderItem={({item}) => <FeedItem item={item} />}
        style={tw`mt-8`}
      />
    </View>
  );
};

export default LatestScreen;
