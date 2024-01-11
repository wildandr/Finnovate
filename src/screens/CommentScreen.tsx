import React from 'react';
import { View, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FeedItem from '../components/FeedItem';
import CommentItem from '../components/CommentItem';

const CommentScreen = () => {
    const feedData = [
        {
            id: '1',
            username: 'JohnDoe',
            timestamp: '1 jam yang lalu',
            text: 'Ini adalah feed pertama. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('../assets/onboarding1.png'),
            likes: 10,
            comments: 3,
        },
        // ... tambahkan data feed lainnya sesuai kebutuhan
    ];

    return (
        <View style={[tw`flex-1`, { backgroundColor: '#002351' }]}>
            <View>
                <FlatList
                    data={feedData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FeedItem item={item} />}
                    style={tw`mt-10`}
                />
            </View>
            <View>
                <FlatList
                    data={feedData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentItem item={item} />}
                    contentContainerStyle={{ paddingVertical: 0 }}
                />
            </View>
        </View>
    );
};

export default CommentScreen;