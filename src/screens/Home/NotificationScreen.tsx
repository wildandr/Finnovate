import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import PlusButton from '../../components/PlusButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationScreen = () => { 
    const navigation = useNavigation();

    return (
        <View style={[tw`flex-1 px-4`, {backgroundColor: '#002351'}]}>
          <View style={[tw` flex-row mt-4 items-center  `]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} style={tw`text-white`} />
        </TouchableOpacity>
        <Text style={[tw`w-full text-center text-white font-medium`, { fontSize: 24 }]}>
        Custom Notification
        </Text>
      </View>
             <Text style={[tw`text-white font-medium mt-8 `, {color: "white", fontSize:18,  }]}>
                Active 
                </Text>
                <PlusButton onPress={() => navigation.navigate('DetailNotif')} />
        </View>
    )
}

export default NotificationScreen;