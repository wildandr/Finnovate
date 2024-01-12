import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary dependency
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfileScreen = () => {
    const navigation = useNavigation(); // Assign the 'navigation' prop

    return (
        <View style={[tw`flex-1`, {backgroundColor: '#002351'}]}>
            <View style={tw`flex-row justify-between items-center p-4`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-bold`}>Profile</Text>
                <TouchableOpacity>
                    <Icon name="checkmark" size={24} color="#FFBC00" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity>
                    <Image
                        style={styles.bannerImage}
                        source={require('../assets/bgProfile.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/avatar2.png')}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 30,
                            position: 'absolute',
                            bottom: -40,
                            left: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>
                <View style={tw`px-5 mt-8`}>
                    <Text style={tw`text-white text-lg font-bold mt-12`}>Name</Text>
                    <TextInput placeholder="Enter your name" placeholderTextColor="white" style={tw`border-b border-white text-white`} />
                    <Text style={tw`text-white text-lg font-bold mt-4`}>Username</Text>
                    <TextInput placeholder="Enter your username" placeholderTextColor="white" style={tw`border-b border-white text-white`} />
                    <Text style={tw`text-white text-lg font-bold mt-4`}>Bio</Text>
                    <TextInput placeholder="Enter your bio" placeholderTextColor="white" style={tw`border-b border-white text-white`} />
                    <Text style={tw`text-white text-lg font-bold mt-4`}>Account</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-yellow-400 mt-2`}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={tw`text-red-500 mt-2`}>Log Out</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001736',
    },
    bannerImage: {
        width: '100%',
        height: 120,
    },
});

export default EditProfileScreen;