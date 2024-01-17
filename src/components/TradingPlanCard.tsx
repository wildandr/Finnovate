import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Text,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DatePicker from 'react-native-date-picker';
import DropdownPrediction from './DropdownPrediction';
import {MaterialIcons} from 'react-native-vector-icons';
import sahamData from '../data/saham.json';
import {ScrollView} from 'react-native-gesture-handler';

const TradingPlanCard = ({onValuesChange}) => {
  const [equitySymbol, setEquitySymbol] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [targetPrice, setTargetPrice] = useState('');
  const [initiatePrice, setInitiatePrice] = useState('');
  const [timing, setTiming] = useState<Date | null>(null);
  const [prediction, setPrediction] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const newSuggestions = sahamData.filter(
      saham =>
        saham.code.toLowerCase().includes(equitySymbol.toLowerCase()) ||
        saham.name.toLowerCase().includes(equitySymbol.toLowerCase()),
    );
    setSuggestions(newSuggestions);
  }, [equitySymbol]);

  const handleInputChange = value => {
    setEquitySymbol(value);
  };

  const handleSelectSuggestion = value => {
    setEquitySymbol(value);
    setSuggestions([]);
  };

  useEffect(() => {
    const selectedEquity = sahamData.find(saham => saham.code === equitySymbol);
    const equityName = selectedEquity ? selectedEquity.name : '';

    const upsidePercentage = calculateUpsidePercentage(
      parseFloat(initiatePrice),
      parseFloat(targetPrice),
    );

    onValuesChange({
      equitySymbol,
      equityName,
      targetPrice,
      initiatePrice,
      timing,
      upsidePercentage,
      prediction,
    });
  }, [equitySymbol, targetPrice, initiatePrice, timing, onValuesChange]);

  const calculateUpsidePercentage = (initialPrice, targetPrice) => {
    return ((targetPrice - initialPrice) / initialPrice) * 100;
  };

  return (
    <ScrollView>
      <DropdownPrediction onValueChange={setPrediction} />
      <View style={[tw`p-4`, {backgroundColor: '#2A476E'}]}>
        <View>
          <TextInput
            value={equitySymbol}
            onChangeText={handleInputChange}
            placeholder="Enter equity symbol"
            placeholderTextColor="gray"
            style={[
              tw`p-2 pl-4 rounded-lg border-0 text-white`,
              {backgroundColor: '#001736'},
            ]}
          />
          {equitySymbol !== '' && (
            <FlatList
              data={suggestions}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <TouchableHighlight
                  onPress={() => handleSelectSuggestion(item.code)}>
                  <Text style={tw`p-2 text-white`}>
                    {item.code} - {item.name}
                  </Text>
                </TouchableHighlight>
              )}
            />
          )}
        </View>
        <TextInput
          value={initiatePrice}
          onChangeText={setInitiatePrice}
          placeholder="Enter initiate price"
          placeholderTextColor="gray"
          style={[
            tw`p-2 pl-4 rounded-lg border-0 text-white mt-4`,
            {backgroundColor: '#001736'},
          ]}
        />
        <TextInput
          value={targetPrice}
          onChangeText={setTargetPrice}
          placeholder="Enter target price"
          placeholderTextColor="gray"
          style={[
            tw`p-2 pl-4 rounded-lg border-0 text-white mt-4`,
            {backgroundColor: '#001736'},
          ]}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            value={timing ? timing.toLocaleDateString() : ''}
            editable={false}
            placeholder="Set Timing"
            placeholderTextColor="gray"
            style={[
              tw`p-2 pl-4 rounded-lg border-0 text-white mt-4`,
              {backgroundColor: '#001736'},
            ]}
          />
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={showDatePicker}
          date={timing || new Date()}
          onConfirm={date => {
            setShowDatePicker(false);
            setTiming(date);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default TradingPlanCard;
