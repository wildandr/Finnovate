import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import level1Image from '../../assets/level1.png';
import level2Image from '../../assets/level2.png';
import level3Image from '../../assets/level3.png';
import level4Image from '../../assets/level4.png';
import level5Image from '../../assets/level5.png';
import level6Image from '../../assets/level6.png';

// Declare the types for images
type LevelImages = {
  [key: string]: any; // Update 'any' with the actual type of your image (e.g., ImageSourcePropType)
};

const Leaderboard = () => {
  const navigation = useNavigation();

  const [tableData, setTableData] = useState({
    tableHead: ['Rank', 'Level', 'User'],
    tableData: [
      ['1', '6', 'John Doe'],
      ['2', '3', 'Jane Smith'],
      ['3', '2', 'Alice'],
      ['4', '1', 'Bob']
    ]
  });

  const levelImages: LevelImages = {
    '1': level1Image,
    '2': level2Image,
    '3': level3Image,
    '4': level4Image,
    '5': level5Image,
    '6': level6Image
  };

  const customizeUserColumn = (data: string[]) => {
    return data.map((cell, index) => {
      let modifiedCell = cell;
      if (index === 1) {
        const imagePath = levelImages[cell];
        return <Image source={imagePath} style={tw`w-8 h-8`} />;
      }
      if (index === 2) {
        modifiedCell = `@${cell}`;
      }
      const style = index === 2 ? [tw`text-white text-lg font-bold text-yellow-400`] : [tw`p-3 text-white text-lg`];
      return <Text style={style}>{modifiedCell}</Text>;
    });
  };

  const customizedData = tableData.tableData.map((rowData) => [
    customizeUserColumn(rowData)
  ]);

  return (
    <View style={[tw`flex-1 px-4`, { backgroundColor: '#002351' }]}>
      <View style={[tw`flex-row mt-4 items-center pb-6 `]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons color={'white'} name="arrow-back-ios-new" size={24} />
        </TouchableOpacity>
        <Text style={[tw`w-full text-center text-white font-medium text-2xl`]}>
          Leaderboard
        </Text>
      </View>
      <Table borderStyle={{}}>
        <Row data={tableData.tableHead} style={[tw`h-10 border-b `, { borderColor: '#FFBC00' }]} textStyle={tw` text-white text-lg`} />
        {customizedData.map((rowData, index) => (
          <Rows key={index} data={rowData} textStyle={tw` text-white text-center`} />
        ))}
      </Table>
    </View>
  );
};

export default Leaderboard;
