import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import SearchTabNavigator from '../../components/SearchTabNavigator';
import SearchTextContext from '../../contexts/SearchTextContext';

const SearchScreen = ({route}) => {
  const {searchText: initialSearchText} = route.params;
  const [searchText, setSearchText] = useState(initialSearchText || '');

  const navigation = useNavigation();

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
      <View style={tw`flex-row items-center justify-between p-5`}>
        <Icon
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <View
          style={[
            tw`flex-1 mx-5 rounded-lg px-2 flex-row items-center`,
            {backgroundColor: '#00112B'},
          ]}>
          <Icon name="search" size={20} color="white" style={tw`left-1`} />
          <TextInput
            style={[tw`flex-1`, {color: 'white', paddingLeft: 20}]}
            placeholder=" Search feeds, trend"
            placeholderTextColor="white"
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
        </View>
      </View>
      <SearchTextContext.Provider value={searchText}>
        <SearchTabNavigator />
      </SearchTextContext.Provider>
    </View>
  );
};

export default SearchScreen;
