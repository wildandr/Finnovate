import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {parseISO, format} from 'date-fns';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const NewsItem = ({item}) => {
  const openLink = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(item.link, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'gray',
          preferredControlTintColor: 'white',
          // Android Properties
          showTitle: true,
          toolbarColor: '#00112B',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={openLink}>
        <View style={[tw` flex-row mt-3 items-center `]}>
          <Image
            source={{uri: item.image.small}}
            style={tw`w-20 h-20 rounded-lg`}
          />
          <View style={[tw`ml-2 w-3/4`]}>
            <Text
              style={[
                tw`text-white font-semibold`,
                {color: '#FFBC00', fontSize: 12},
              ]}>
              {format(parseISO(item.isoDate), 'dd MMM yy')}
            </Text>
            <Text
              style={[
                tw`text-white font-bold mt-1`,
                {color: 'white', fontSize: 14, flexShrink: 1},
              ]}>
              {item.title}
            </Text>
            <Text style={[tw`text-white `, {color: '#CBD5E1', fontSize: 10}]}>
              {item.contentSnippet}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default NewsItem;
