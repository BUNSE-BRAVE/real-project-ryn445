import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Weather from './weathersearchdetail';
import SearchBar from './weathersearchBar';

const API_KEY = "ab15fb1e61e3d1916f830c1877a2c9fe";//this is my api-key from openweather


export default function Weatherscreen  ({ navigation }) {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}` //this api use for normal wearher from openweather
         
        try {
            const response = await fetch(API);                    //connection
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Regina');//Initial display Regina
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.format}>
                <ActivityIndicator color='gray'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) {    //report an error
        return (
            <View style={styles.format}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.error}>Please enter the correct city name,and Try again.</Text>
            </View>
        )
    }

    return (

        <View style={styles.format}>
          
    <Button 
        title="Automatically locate weather forecast"
        onPress={() => navigation.navigate('Automatically locate weather forecast')}//jump to Forecastscreen
      />
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    );
}

const styles = StyleSheet.create({
  format: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
      margin: 20,
      fontSize: 28,
      backgroundColor: 'red',
  }
});
