import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  route: { params: { courseId: string } };
};

type MaterialDetail = {
  id: string;
  content: string;
};

type QuizOption = {
  id: string;
  options: string;
  answer: string;
  isCorrect: boolean;
};

type Quiz = {
  id: string;
  question: string;
  image: string;
  explanation: string;
  options: Record<string, QuizOption>;
};

type Material = {
  id: string;
  title: string;
  description: string;
  details: Record<string, MaterialDetail>;
  quizzes: Record<string, Quiz>;
};

type Chapter = {
  id: string;
  title: string;
  materials: Record<string, Material>;
};

type Course = {
  id: string;
  title: string;
  category: string;
  image_path: string;
  duration: string;
  description: string;
  difficulty: string;
  chapters: Record<string, Chapter>;
};

const DetailCourse = ({ route }: Props) => {
  const navigation = useNavigation();
  const { courseId } = route.params;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Fetch the single course using the provided endpoint
    fetch(`http://10.0.2.2:3001/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched course:', data);
        setCourse(data[courseId]);
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
      });
  }, [courseId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = (materialId: string) => {
    // You may want to navigate to a specific material screen using materialId
    navigation.navigate('MaterialContent', { materialId });
  };

  if (!course) {
    return (
      <View style={[tw`h-full`, { backgroundColor: '#FFFFFF' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[tw`h-full`, { backgroundColor: '#FFFFFF' }]}>
      <View style={[tw`px-4 flex-row mt-4 items-center pb-6 border-b border-gray-200`]}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons color={'black'} name="arrow-back-ios-new" size={24} />
        </TouchableOpacity>
        <Text style={[tw`w-full text-center text-black font-medium`, { fontSize: 24 }]}>
          Course Detail
        </Text>
      </View>
      <ScrollView>
        <Image source={{ uri: course.image_path }} style={tw`w-48 mt-5 h-40 mx-auto`} />
        <View style={[tw`px-5 mt-5`]}>
          <Text style={[tw`text-black font-semibold text-center mb-2`, { fontSize: 24 }]}>
            {course.title}
          </Text>
          <Text style={[tw`text-black font-light text-center`, { fontSize: 14 }]}>
            {course.description}
          </Text>
        </View>
        <View style={[tw`px-4 py-5 mt-3`, { backgroundColor: '#F3F4F6' }]}>
          {Object.values(course.chapters).map((chapter) => (
            <View key={chapter.id}>
              <Text
                style={[
                  tw`text-black font-medium text-center mb-2 mt-2 px-10`,
                  { fontSize: 20 },
                ]}
              >
                {chapter.title}
              </Text>
              {Object.values(chapter.materials).map((material) => (
                <TouchableOpacity key={material.id} onPress={() => handlePress(material.id)}>
                  <View style={[tw`flex-row mt-2 bg-white p-4 rounded-md`]}>
                    <Text
                      style={[
                        tw`text-white px-3 py-2 rounded-full`,
                        { fontSize: 16, backgroundColor: '#CEF2FF', color: '#007BFF' },
                      ]}
                    >
                      {material.id}
                    </Text>
                    <Text
                      style={[
                        tw`text-black text-center w-11/12 text-left ml-2`,
                        { fontSize: 16 },
                      ]}
                    >
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
