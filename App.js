import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Weatherscreen from './components/weathersearchscreen';
import Forecastscreen from './components/Forecastscreen';

const Stack = createNativeStackNavigator();

function App() {           //  Navigation page
  return (
    <NavigationContainer>    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Weatherscreen} />
        <Stack.Screen name="Automatically locate weather forecast" component={Forecastscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

