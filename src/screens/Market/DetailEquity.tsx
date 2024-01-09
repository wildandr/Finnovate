import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import EquityContent from '../../components/EquityContent';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-elements';

type RootStackParamList = {
  DetailEquity: { equity: any };
};

const DetailEquity = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailEquity'>>();
  const equity = route.params?.equity;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[tw`flex-1 px-4`, { backgroundColor: '#002351' }]}>
      <View style={[tw`flex-row mt-4 items-center justify-between`]}>
      <TouchableOpacity onPress={handleGoBack}>
      <Icon name="chevron-left" size={24} color="white" style={tw``} />
      </TouchableOpacity>
      <Icon name="star-o" size={24} color="white" style={tw`justify-end`} />
     </View>
      <Text style={[tw`mt-5  font-semibold`, {color:"#FFBC00", fontSize:22}]}>{equity.name}</Text>
      <Text style={[tw``, {color:"#CBD5E1", fontSize:14}]}>{equity.company}.</Text>
      <View style={[tw` flex-row mt-3 items-center justify-between`, ]}>
        <Text style={[tw`text-white font-bold`, {fontSize:32}]} >{equity.price}</Text>
        <View style={[tw`flex-row items-center `, ]}>
        <Icon
                name="caret-up"
                size={12}
                color="#50CD89"
                style={tw``}
              />
        <Text style={[tw` ml-1`, {color:'#50CD89',fontSize:20}]} >{equity.percent}%</Text>
        </View>
        </View>
      <Image source={require('../../assets/chart.png')} style={tw`w-full border border-gray-700 h-64 mt-5`} />

      
    </View>
  );
};

export default DetailEquity;
