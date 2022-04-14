import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import DateTime from './Forecastdetail'
import WeatherScroll from './ForecastScroll'
const API_KEY = "ab15fb1e61e3d1916f830c1877a2c9fe";//this is my api-key from openweather
const img = require('../assets/backgroundImages/img/snow.jpg')
export default function Forecastscreen() {

  const [data, setData] = useState({});
  useEffect(() => {
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();   //Get permission
      let location = await Location.getCurrentPositionAsync({});          //positioning
      fetchData(location.coords.latitude, location.coords.longitude);
    })();                                                       //get latitude and longitude
  }, [])

  const fetchData = (latitude, longitude) => {
    if(latitude && longitude) {  // use one call openwather Api only can use  latitude and longitude to 
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.format}>
      <ImageBackground source={img} style={styles.image} >
      <DateTime current={data.current} timezone={data.timezone}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({   //css
  format: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
