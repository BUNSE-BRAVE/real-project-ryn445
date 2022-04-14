import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './weathersearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,                                              //Data from openweather
            name,
            main: { temp, humidity ,pressure,feels_like},
            wind: { speed }, 
            clouds:{all},
            visibility,
                
    } = weatherData;

    const [{ main }] = weather;

    useEffect((main) => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])
     

    function getBackgroundImg(weather) {                   //Automatically replace the corresponding background according to the openweatherapi  returned
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return snow;   
    }

    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='gray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'   //Scale the image uniformly
            >                    
<SearchBar fetchWeatherData={fetchWeatherData} />
<View style={{alignItems: 'center' }}>    
<Text style={{ ...styles.headerText, fontWeight: 'bold', fontSize: 60 }}>{name}</Text>
<Text style={{ ...styles.headerText, fontWeight: 'normal',fontSize: 50,color:'white'}}>{main}</Text>
<Text style={{ ...styles.headerText,fontWeight: 'normal',color:'green',fontSize: 80 }}>{temp} °C</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.intable}>
                        <Text style={ styles.intableText }>Humidity</Text>
                        <Text style={ styles.intableText }>{humidity} %</Text>
                    </View>

                    <View style={styles.intable}>
                        <Text style={styles.intableText }>Wind Speed</Text>
                        <Text style={styles.intableText }>{speed} m/s</Text>
                    </View>  
                </View>

                <View style={styles.table}>
                    <View style={styles.intable}>
                        <Text style={styles.intableText}>Pressure:</Text>
                        <Text style={styles.intableText}>{pressure} Pa</Text>
                    </View>

                    <View style={styles.intable}>
                        <Text style={styles.intableText}>Feel Like</Text>
                        <Text style={styles.intableText}>{feels_like} °C</Text>
                    </View>
                    
                </View>
                    <View style={styles.table}>
                    <View style={styles.intable}>
                        <Text style={ styles.intableText }>Cloudiness</Text>
                        <Text style={ styles.intableText }>{all} %</Text>
                    </View>
                    <View style={styles.intable}>
                        <Text style={ styles.intableText }>visibility</Text>
                        <Text style={ styles.intableText }>{visibility}km </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({   //css
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 50,
        marginTop: 1,
    },
    table: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        padding: 10
    },
  
    intable: {
        width: 150,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    intableText:{
      fontSize: 22, 
      color: 'white',
    },
    

});
  