import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment-timezone'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const Forecastitem = ({title, value, unit}) => { //Define the format
    return(
        <View style={styles.forecastItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) => {   //Time  function
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    
    return (//show the forecast information
        <View style={styles.format}>        
           <View>
               <View>
                <Text style={styles.shead}>Date:{date}</Text>
                   <Text style={styles.head}>{time}</Text>
                    <Text style={styles.thead}>Time zone/Location：{timezone}</Text>
               </View>
             
               <View style={styles.forecastItemContainer}>
               
 <Forecastitem title="temperature:" value={current? current.temp : ""} unit="°C"/>
 <Forecastitem title="Humidity:" value={current? current.humidity : ""} unit="%"/>
<Forecastitem title="Pressure:   " value={current? current.pressure : ""} unit="   PA"/>
 <Forecastitem title="wind speed:   " value={current? current.wind_speed : ""} unit="   m/s"/>
<Forecastitem title="feel like:" value={current? current.feels_like : ""} unit="°C"/>
<Forecastitem title="Sunrise:" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="   am"/>
<Forecastitem title="Sunset:" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="    pm"/>
                 
               </View>
           </View>
          
        </View>
    )
}

const styles = StyleSheet.create({    //css
    format: {
        flex:1.7,
        flexDirection:"row",
        justifyContent:'space-between',
        padding: 15
    },
    head: {
        fontSize: 45,
        color:'white',
        fontWeight: '100'
    },
    shead: {
        fontSize: 30,
        color: 'white',
        fontWeight: '300'
    },
    thead: {
        fontSize: 18,
        color: 'red',
        fontWeight: '300'
    },

    forecastItemContainer: {
        backgroundColor: "black",
        borderRadius: 10,
        padding: 40,
        marginTop: 1
        
    }, 
    forecastItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
       title: {
        color:'white',
        fontSize: 20,
        fontWeight: '100'
    }
})

export default DateTime
