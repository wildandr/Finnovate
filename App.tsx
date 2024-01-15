import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#00112B" />
      <Navigation />
    </>
  );
};

export default App;
