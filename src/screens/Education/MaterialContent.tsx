import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type MaterialContentProps = {
  route: { params: { materialId: string } };
};

type MaterialDetails = {
  material_detail_id: string;
  material_detail_content: string;
};

const MaterialContent: React.FC<MaterialContentProps> = ({ route }) => {
  const navigation = useNavigation();
  const { materialId } = route.params;
  const [materialDetails, setMaterialDetails] = useState<MaterialDetails | null>(null);

  useEffect(() => {
    // Fetch material details from the endpoint when the component mounts
    fetch(`http://10.0.2.2:3001/materials/${materialId}/details`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched material details:', data); // Log the received data
        if (data && data.length > 0) {
          // Assuming the endpoint returns an array; adjust if needed
          setMaterialDetails(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching material details:', error);
      });
  }, [materialId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = () => {
    navigation.navigate('QuizScreen', { materialId });
  };

  return (
    <View style={[tw`h-full py-2`, { backgroundColor: '#FFFFFF' }]}>
      <ScrollView>
        <View style={[tw`px-4 flex-row mt-4 items-center pb-6 border-b border-gray-200`]}>
          <TouchableOpacity onPress={handleGoBack}>
            <MaterialIcons color={'black'} name="arrow-back-ios-new" size={24} />
          </TouchableOpacity>
        </View>
        <View style={[tw`px-4 mt-5`]}>
          <Text style={[tw`text-black font-semibold text-center mb-2 px-4`, { fontSize: 24 }]}>
            Understanding the Stock Market Landscape
          </Text>
          <Text style={[tw`text-black font-light text-center`, { fontSize: 14 }]}>
            {materialDetails?.material_detail_content || 'In this chapter, we will explore the intricate landscape of the stock market, delving into its key components, functions, and the diverse participants that shape its dynamics.'}
          </Text>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <Text
            style={[
              tw`text-white rounded-md font-semibold text-center mb-2 mt-2 py-2 px-5 mx-auto`,
              { fontSize: 14, backgroundColor: '#FFBC00' },
            ]}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>

        <View style={[tw`px-4 mt-3 text-left`]}>
          <Text style={[tw`text-black font-semibold  mb-2 `, { fontSize: 24 }]}>
            Key Components of the Stock Market
          </Text>
          <Text style={[tw`text-black   mb-2 `, { fontSize: 14 }]}>
            1. Stock Exchanges: Explore the significance of stock exchanges as the
            primary platforms where buyers and sellers come together to trade
            stocks, and how they contribute to market transparency and
            liquidity.{'\n'}{'\n'}
            2. Listed Companies: Understand the role of companies listed
            on the stock exchange, the process of going public through an
            Initial Public Offering (IPO), and the ongoing responsibilities of
            being a publicly traded entity.{'\n'}{'\n'}
            3. Investors: Analyze the diverse range
            of participants in the stock market, from individual retail
            investors to institutional investors, and understand how their
            motivations and strategies influence market movements.
          </Text>
        </View>

        <View style={[tw`px-4 mt-5  `]}>
          <Text
            style={[
              tw`text-black font-semibold text-left mb-2`,
              { fontSize: 24 },
            ]}
          >
            Unlocking Knowledge: Congratulations on Mastering [Topic]!
          </Text>
          <Text style={[tw`text-black font-light `, { fontSize: 14 }]}>
            Congratulations on reaching this milestone! Now, let's elevate your
            understanding even further. Join our quiz and challenge yourself to
            solidify your grasp on [topic]. Embrace the opportunity to showcase
            your expertise and keep the learning momentum going. Happy
            exploring! 🌟
          </Text>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <Text
            style={[
              tw`text-white rounded-md font-semibold text-center mb-2 mt-2 py-2 px-5 mx-auto`,
              { fontSize: 14, backgroundColor: '#FFBC00' },
            ]}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MaterialContent;
