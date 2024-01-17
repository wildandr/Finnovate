import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DropdownNotificationMethod from '../../components/DropdownNotificationMethod';
import DropdownNotificationEquity from '../../components/DropdownNotificationEquity';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddNotificationScreen = () => {
    const [method, setMethod] = useState('');
    const [equity, setEquity] = useState('');
    const navigation = useNavigation();
    return (
        <View style={[tw`flex-1 px-4`, {backgroundColor: '#002351'}]}>
         <View style={[tw` flex-row mt-4 items-center  `]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons color={'white'} name="arrow-back-ios-new" size={24} />
        </TouchableOpacity>
        <Text style={[tw`w-full text-center text-white font-medium`, { fontSize: 24 }]}>
        Custom Notification
        </Text>
      </View>
          <View >
            <Text style={[tw`text-white font-medium mt-8 mb-2`, {color: "white", fontSize:16,  }]}>
                Notification method
                </Text>
                <DropdownNotificationMethod onValueChange={setMethod} />
          </View>
          <View >
            <Text style={[tw`text-white font-medium mt-4 `, {color: "white", fontSize:16,  }]}>
               Set equity
                </Text>
                <DropdownNotificationEquity onValueChange={setEquity} />
          </View>
          <View >
            <Text style={[tw`text-white font-medium mt-4 `, {color: "white", fontSize:16,  }]}>
               Set price
                </Text>
            <TextInput style={[tw`text-white mt-2 px-2 border border-gray-500 rounded-lg`, {color: "white", fontSize:16,  }]}/>
          </View>
     </View>
    )

}

export default AddNotificationScreen;