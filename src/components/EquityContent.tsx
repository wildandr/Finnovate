import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const EquityContent = ({ equity }: { equity: any }) => {
  return (
    <View style={[tw`flex-row mt-3 mb-2 items-center justify-between`]}>
        <View style={tw`flex-row`}>
          <Image
            source={{uri: equity.avatar}}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-5`}>
            <Text
              style={[
                tw`text-white text-base font-semibold`,
                {color: '#FFBC00'},
              ]}>
              {equity.name}
            </Text>
            <View style={tw`flex-row items-center `}>
              <Text style={[tw`text-white text-base font-semibold `]}>
                {equity.price}
              </Text>
              <Icon
                name="caret-up"
                size={12}
                color="#50CD89"
                style={tw`ml-2`}
              />
              <Text style={[tw`text-white text-sm  ml-1 `, {color: '#50CD89'}]}>
                {equity.percent}%
              </Text>
            </View>
          </View>
        </View>
        <Icon name="star-o" size={24} color="white" style={tw`justify-end`} />
      </View>
  );
};

export default EquityContent;