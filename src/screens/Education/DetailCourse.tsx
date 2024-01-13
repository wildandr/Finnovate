// Import necessary libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { CourseScreenRouteProp, CourseScreenNavigationProp } from './Course';
import { courses } from '../../data/courses';

type Props = {
  route: CourseScreenRouteProp & { params: { courseIndex?: number } }; // Make courseIndex optional
  navigation: CourseScreenNavigationProp;
};

type Material = {
  id: string;
  title: string;
  desc: string;
};

type Chapter = {
  id: string;
  title: string;
  material: Material[];
};

type Course = {
  id: string;
  category: string;
  title: string;
  image: any; // Adjust the type based on the actual type of the 'image' property
  duration: string;
  desc: string;
  chapters: Chapter[];
};

const DetailCourse = ({ route }: Props) => {
  const navigation = useNavigation();
  const { courseIndex } = route.params || {};
  const selectedCourse = courses[courseIndex || 0]; // Default to 0 if courseIndex is undefined
  console.log(route.params);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = () => {
    navigation.navigate('CourseContent');
  };

  return (
    <View style={[tw`h-full`, { backgroundColor: '#FFFFFF' }]}>
      <View style={[tw`px-4 flex-row mt-4 items-center pb-6 border-b border-gray-200`]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} style={tw`text-black`} />
        </TouchableOpacity>
        <Text style={[tw`w-full text-center text-black font-medium`, { fontSize: 24 }]}>
          Course Detail
        </Text>
      </View>
      <ScrollView>
        <Image
          source={require('../../assets/course1.png')}
          style={tw`w-48 mt-5 h-40 mx-auto `}
        />
        <View style={[tw`px-5 mt-5  `]}>
          <Text style={[tw`text-black font-semibold text-center mb-2`, { fontSize: 24 }]}>
            {selectedCourse.title}
          </Text>
          <Text style={[tw`text-black font-light text-center`, { fontSize: 14 }]}>
            {selectedCourse.desc}
          </Text>
        </View>
        <View style={[tw`px-4 py-5 mt-3 `, { backgroundColor: '#F3F4F6' }]}>
          {selectedCourse.chapters.map((chapter: Chapter) => (
            <View key={chapter.id}>
              <Text
                style={[
                  tw`text-black font-medium text-center mb-2 mt-2 px-10`,
                  { fontSize: 20 },
                ]}
              >
                {chapter.title}
              </Text>
              {chapter.material.map((material: Material) => (
                <TouchableOpacity key={material.id} onPress={handlePress}>
                  <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
                    <Text
                      style={[
                        tw`text-white px-3 py-2 rounded-full`,
                        { fontSize: 16, backgroundColor: '#CEF2FF', color: '#007BFF' },
                      ]}
                    >
                      {material.id}
                    </Text>
                    <Text style={[tw`text-black text-center w-11/12 text-left ml-2`, { fontSize: 16 }]}>
                      {material.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailCourse;
