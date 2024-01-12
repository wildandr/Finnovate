import React from 'react';
import {Image, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const PublishImageCard = ({image}) => {
  if (!image) {
    return null;
  }

  return (
    <View style={tw`mt-4`}>
      <Image
        source={image}
        style={{width: '100%', height: 200, borderRadius: 8}}
        resizeMode="contain"
      />
    </View>
  );
};

export default PublishImageCard;
