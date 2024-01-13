// Course.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import { courses } from '../../data/courses';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

export type EducationTopTabParamList = {
  Discover: undefined;
  Beginner: { category: string };
  Moderate: { category: string };
  Advanced: { category: string };
};

export type CourseScreenRouteProp = RouteProp<
  EducationTopTabParamList,
  'Discover' | 'Beginner' | 'Moderate' | 'Advanced'
>;

export type CourseScreenNavigationProp = StackNavigationProp<
  EducationTopTabParamList,
  'Discover' | 'Beginner' | 'Moderate' | 'Advanced'
>;

export type Props = {
  route: CourseScreenRouteProp;
  navigation: CourseScreenNavigationProp;
};

const Course = ({ route, navigation }: Props) => {
  const { category } = route.params || {};

  const filteredCourses = category
    ? courses.filter((course) => course.category === category)
    : courses;

    const handlePress = (course: any) => {
        const courseIndex = courses.findIndex((c) => c.id === course.id);
        navigation.navigate('DetailCourse', { courseIndex });
      };
      

  const renderCourseItem = ({ item }: { item: typeof courses[number] }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={[tw`mt-3 rounded-lg py-4 px-5`, { backgroundColor: '#2A476E' }]}>
        <View style={[tw`flex-row `]}>
          <Image source={item.image} style={tw`w-1/3 h-24`} />
          <View style={[tw`ml-5`]}>
            <Text style={[tw`text-left text-white font-semibold`, { fontSize: 20 }]}>
              {item.title}
            </Text>
            <View style={[tw`flex-row items-center`]}>
              <Text style={[tw`text-white`, { fontSize: 16 }]}>{item.category}</Text>
              <Icon name="circle" size={6} color="white" style={tw`ml-2`} />
              <Text style={[tw`text-white ml-2`, { fontSize: 16 }]}>{`${item.duration} Hours`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[tw`h-full px-4 pb-5`, { backgroundColor: '#002351' }]}>
        <ScrollView>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
      />
      </ScrollView>
    </View>
  );
};

export default Course;
