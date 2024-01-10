import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const News = () => {
    return (
        <View style={[tw`h-full px-4`, {backgroundColor:'#002351'}]}>
           <View style={[tw` flex-row mt-3 items-center `, ]}>
  <Image source={require('../../assets/img1.jpg')} style={tw`w-16 h-16 rounded-lg`} />
  <View style={[tw`ml-2 w-3/4`, ]}>
    <Text style={[tw`text-white font-semibold`, {color: "#FFBC00", fontSize:8 }]}>4 Jan 2024</Text>
    <Text style={[tw`text-white font-bold mt-1`, {color: "white", fontSize:12, flexShrink:1 }]}>
      Insurtech startup PasarPolis gets $54 million — Series B 
    </Text>
    <Text style={[tw`text-white `, {color: "#CBD5E1", fontSize:8, }]}>
      Insurtech startup PasarPolis gets $54 million — Series B
    </Text>
  </View>
</View>
        </View>
    )
}

export default News;