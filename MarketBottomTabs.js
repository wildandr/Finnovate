// MarketTopTabGroup.js
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import tw from 'tailwind-react-native-classnames';
import {Text} from 'react-native';
import News from './src/components/News';
import MarketTechnical from './src/screens/Market/MarketTechnical';
import MarketFundamental from './src/screens/Market/MarketFundamental';

const MarketTopTab = createMaterialTopTabNavigator();

const CustomTabLabel = ({label, focused, color, style, fontSize}) => (
  <Text style={[style, {color, textTransform: 'none', fontSize}]}>{label}</Text>
);

function MarketTopTabGroup() {
  return (
    <MarketTopTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#002351',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
      })}>
      <MarketTopTab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel
              label="Related News"
              focused={focused}
              color={color}
              style={[tw`font-bold`]}
              fontSize={16}
            />
          ),
        }}
      />
      <MarketTopTab.Screen
        name="Technical"
        component={MarketTechnical}
        options={{
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel
              label="Technical"
              focused={focused}
              color={color}
              style={[tw`font-bold`]}
              fontSize={16}
            />
          ),
        }}
      />
      <MarketTopTab.Screen
        name="Fundamental"
        component={MarketFundamental}
        options={{
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel
              label="Fundamental"
              focused={focused}
              color={color}
              style={[tw`font-bold`]}
              fontSize={16}
            />
          ),
        }}
      />
    </MarketTopTab.Navigator>
  );
}

export default MarketTopTabGroup;
