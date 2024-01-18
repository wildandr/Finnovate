import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import EquityContent from './EquityContent';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  DetailEquity: {equity: any};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'DetailEquity'>;

const Equity = ({equity}: {equity: any}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('DetailEquity', {equity});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <EquityContent equity={equity} />
    </TouchableOpacity>
  );
};

export default Equity;
