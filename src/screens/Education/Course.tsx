// Import necessary libraries
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';

const Course = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("DetailCourse");
  };
 
  return (

      <View style={[tw`h-full px-4`, { backgroundColor: '#002351' }]}>
        
         <TouchableOpacity onPress={handlePress}>
        <View style={[tw` mt-3 rounded-lg py-4 px-5 `, { backgroundColor: '#2A476E' }]}>
          <View style={[tw`flex-row  justify-between`]}>
            <Image
              source={require('../../assets/course1.png')}
              style={tw`w-1/3 h-24 `}
            />
            <View style={[tw``]}>
              <Text style={[tw`text-white font-semibold`, { fontSize: 20 }]}>
                Stock Fundamental
              </Text>
              <View style={[tw`flex-row items-center`]}>
                <Text style={[tw`text-white`, { fontSize: 16 }]}>Beginner</Text>
                <Icon name='circle' size={6} color='white' style={tw`ml-2`} />
                <Text style={[tw`text-white ml-2`, { fontSize: 16 }]}>3 Hours</Text>
              </View>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </View>
      
  )
};

export default Course;
