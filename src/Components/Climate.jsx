import axios from 'axios'
import { useState, useEffect } from 'react';


const Climate = () => {
    
    const [climate, setClimate] = useState({})  

    let lat = []
    let lon = []

    const success = (position) => {
        lat.push(position.coords.latitude)
        lon.push(position.coords.longitude)
    }
     
    navigator.geolocation.getCurrentPosition(success)      
    
        useEffect(() => {

        
           axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat[0]}&lon=${lon[0]}&appid=573f57ce963a1a40d2fe2f711b4edcd7`)
            .then ( resp => {
                setClimate(resp.data)
        })
        .catch (error => console.error(error))

        }, [])



    const temperature = Math.floor(`${climate.main?.temp}` - 273.15)

    const [isCelsius, setIsCelsius] = useState(true)

    const changeUnit = () => {
        setIsCelsius(!isCelsius)
    }


    return (
        <>
        <div >
         <h1 className='title' >WEATHER APP</h1>
        </div>
        <div className='container'>
         <h1>{isCelsius ? temperature : (temperature * 1.8) + 32}° {isCelsius ? "C" : "F"}</h1>
         <img src="/images/1.svg" alt="" />
         <h3>HUMIDITY: {climate.main?.humidity}%</h3>
         <h3>WIND: {climate.wind?.speed} m/s</h3>
         <h3>WEATHER: {climate.weather?.[0].main}</h3>
         <h2>{climate.name}, {climate.sys?.country}</h2>
        </div>
        <button onClick={changeUnit}>Change Unit Of Measure</button>
        </>
    )
}

export default Climate