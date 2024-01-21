import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the endpoint when the component mounts
    fetch('http://10.0.2.2:3001/courses')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched courses:', data); // Log the received data
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const filteredCourses = category
    ? Object.values(courses)
        .filter((course) => course.category === category)
        .map((course) => ({
          ...course,
          image_path: `http://10.0.2.2:3001/courses/${course.image_path}`,
          chapters: Object.values(course.chapters).map((chapter) => ({
            ...chapter,
            materials: Object.values(chapter.materials).map((material) => ({
              ...material,
              quizzes: Object.values(material.quizzes).map((quiz) => ({
                ...quiz,
                options: Object.values(quiz.options),
              })),
            })),
          })),
        }))
    : Object.values(courses).map((course) => ({
        ...course,
        image_path: `http://10.0.2.2:3001/courses/${course.image_path}`,
        chapters: Object.values(course.chapters).map((chapter) => ({
          ...chapter,
          materials: Object.values(chapter.materials).map((material) => ({
            ...material,
            quizzes: Object.values(material.quizzes).map((quiz) => ({
              ...quiz,
              options: Object.values(quiz.options),
            })),
          })),
        })),
      }));

  const handlePress = (courseId: string) => {
    navigation.navigate('DetailCourse', { courseId });
  };

  const renderCourseItem = ({ item }: { item: typeof courses[number] }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={[tw`mt-3 rounded-lg py-4 px-5`, { backgroundColor: '#2A476E' }]}>
        <View style={[tw`flex-row `]}>
          <Image source={{ uri: item.image_path }} style={tw`w-1/3 h-24`} />
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
    <FlatList
      style={[tw`h-full  px-4 pb-5`, { backgroundColor: '#002351' }]}
      data={filteredCourses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCourseItem}
    />
  );
};

export default Course;
