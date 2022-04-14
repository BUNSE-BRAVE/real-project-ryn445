import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'

const WeatherScroll = ({weatherData}) => {
    return (
        <ScrollView horizontal={true} style={styles.scrollView}>
            <Scroll data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <Scroll data={weatherData}/>
        </ScrollView>
    )
}

const FutureItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View  style={styles.scrollContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            <Text  style={styles.temp}>Temperature:{forecastItem.temp.day}°C</Text>

        </View>
    )
}

const Scroll= ({data}) => {

    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.scrollContainer}>
                 <View>
                    <Text  style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Image source={img} style={styles.image} />
                    <Text  style={styles.temp}>Temperature:{data.temp.day}°C</Text>
                </View>
            </View>
        )
    }else{
        return( 
            <View>
            
 <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureItem key={idx} forecastItem={data}/>
                ))
                :
                <View/>
            }
          
        </View>
            </View>

        )
        
    }
   
}

const styles = StyleSheet.create({  //css
    scrollView: {
        flex:1.6,
        backgroundColor: 'rgb(24,24,27)',
        padding:30
    },
    image: {
        width: 100,
        height: 100,
         alignItems: 'center',
    justifyContent: 'center',
    },
   scrollContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'rgb(24,24,27)',
        borderRadius:10,
        borderColor:"gray",
        borderWidth:1,
        padding: 12,
        marginLeft: 10
    },
      
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "gray",
        padding: 12,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "100",
        marginBottom: 15
    },
    temp: {
         fontSize: 15,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
 
})

export default WeatherScroll
