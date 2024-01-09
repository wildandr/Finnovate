import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import News from './src/screens/Market/News';
import MarketTechnical from './src/screens/Market/MarketTechnical';
import MarketFundamental from './src/screens/Market/MarketFundamental';

const MarketTopTab = createMaterialTopTabNavigator();

function MarketTopTabGroup() {
  return (
    <MarketTopTab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: {
          fontWeight: 'bold',
          backgroundColor: '#002351',
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
      }}>
      <MarketTopTab.Screen name="News" component={News} />
      <MarketTopTab.Screen name="Technical" component={MarketTechnical} />
      <MarketTopTab.Screen name="Fundamental" component={MarketFundamental} />
    </MarketTopTab.Navigator>
  );
    }

export default MarketTopTabGroup;