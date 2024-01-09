import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or whatever library you're using for icons
import tw from 'tailwind-react-native-classnames';
import PublishButton from '../components/PublishButton'; // import the new PublishButton component

const PublishScreen = () => {
  const [content, setContent] = useState('');

  const publishPost = () => {
    // Here you would typically handle the publishing logic, e.g. send the data to your server
    console.log(`Publishing post with content: ${content}`);
  };

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#002351' }]}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View style={tw`flex-1 ml-28`}>
            <Text style={tw`text-2xl text-white`}>Create Post</Text>
          </View>
          <View style={tw`w-24`}>
            <PublishButton/>
          </View>
        </View>
        <View style={tw`flex-row items-center mt-4`}>
          <Icon name="user-circle" size={36} color="white" style={tw`mr-2`} />
          <TextInput
            style={[tw`flex-1 p-2`, {color: 'white', flexShrink: 1}]}
            placeholder="What have you been eyeing lately?"
            placeholderTextColor="#CBD5E0" // gray-200 in Tailwind CSS
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={0}
          />
        </View>
      </View>
    </View>
  );
};

export default PublishScreen;