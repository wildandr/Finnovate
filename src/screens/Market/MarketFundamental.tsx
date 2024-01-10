import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ScrollView } from 'react-native-gesture-handler';
const MarketFundamental = () => {
    return (
        <View style={[tw`h-full `, { backgroundColor: '#002351' }]}>
        <ScrollView style={[tw`px-4`]}>
          <Text style={[tw`mt-4 text-white font-semibold`, { fontSize: 16 }]}>
            Sentiment Analysis Technical Prediction
          </Text>
          <View style={[tw`px-4 border border-gray-500 rounded-sm mt-4`,]}>
            <View style={[tw`flex-row items-center py-2 justify-between`,]}>
            <Text style={[tw`text-white `, { fontSize: 16 }]}>
                Upward trend of price
                </Text>
                <Text style={[tw`text-white px-3 py-2 rounded-full`, { fontSize: 16, backgroundColor:'#125933', color:'#50CD89' }]}>
                    90%
                    </Text>
                </View>
            </View>
            <Text style={[tw`mt-4 text-white `, { fontSize: 16 }]}>
                Related news & community 
                </Text>
                <View style={[tw` flex-row mt-3 items-center mb-10`, ]}>
  <Image source={require('../../assets/img1.jpg')} style={tw`w-16 h-16 rounded-lg`} />
  <View style={[tw`ml-2 w-3/4 `, ]}>
    <Text style={[tw`text-white font-semibold`, {color: "#FFBC00", fontSize:8 }]}>4 Jan 2024</Text>
    <Text style={[tw`text-white font-bold mt-1`, {color: "white", fontSize:12, flexShrink:1 }]}>
      Insurtech startup PasarPolis gets $54 million — Series B 
    </Text>
    <Text style={[tw`text-white `, {color: "#CBD5E1", fontSize:8, }]}>
      Insurtech startup PasarPolis gets $54 million — Series B
    </Text>
  </View>
</View>
        </ScrollView>
      </View>
    );
    
}

export default MarketFundamental;