import React from 'react';
import { Image, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const PublishImageCard = () => {
  return (
    <View style={tw`mt-4`}>
      <Image
        source={require('../assets/onboarding1.png')}
        style={{ width: '100%', height: 200, borderRadius: 8 }}
        resizeMode="contain" // Add this line
      />
    </View>
  );
};

export default PublishImageCard;