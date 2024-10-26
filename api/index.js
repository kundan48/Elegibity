const express = require('express');
const router = express.Router();
const axios = require('axios');
const cron = require('node-cron'); 
const apiKey = process.env.OPENWEATHER_API_KEY;
const Weather = require('../Models/newModel');

const cities = ['Delhi', 'Mumbai', 'rourkela','Chennai','Bangalore', 'Hyderabad','Kolkata'];

// Previous day date in Indian time Zone->>>>
const getPreviousDate = () => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1); 
    const year = previousDate.getFullYear();
    const month = String(previousDate.getMonth() + 1).padStart(2, '0');
    const day = String(previousDate.getDate())
    return `${year}-${month}-${day}`;
};

// Current day date in Indian time zone->>>>>>>>
const date = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate());
    return `${year}-${month}-${day}`;
};


// Calling Openapi and console and retunrn->>>>>
const DataFromOpenApi = async () => {
    let cityData = {};
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const { main, weather, dt } = response.data;
        cityData[city] = {
          temp: main.temp,
          feels_like: main.feels_like,
          condition: weather[0].main,
          timestamp: new Date(dt * 1000).toLocaleString(),
        };
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        cityData[city] = { error: 'Could not fetch data' };
      }
    }
    return cityData;
  };



// ->> Calling openweatherapi and Stroring Current data in Mongodb that data coming from openweatherapi in every 5 minute->>>>
const fetchWeatherData = async () => {
    let cityData = {};
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            cityData[city] = response.data;
        } catch (error) {
            console.error(`Error fetching data for ${city}:`, error);
            cityData[city] = { error: "Could not fetch data" };
        }
    }
    let availableData = await Weather.findOne({ date: date() });
    if (availableData) {         
        if (!availableData.data) {
            availableData.data = new Map();
        }
        for (let cityName in cityData) {
            const cityWeather = cityData[cityName];
            let cityWeatherData = availableData.data.get(cityName);
            if (!cityWeatherData) {
                cityWeatherData = {
                    temp: [cityWeather.main.temp],
                    min_temp: cityWeather.main.temp,
                    max_temp: cityWeather.main.temp,
                    map_val: cityWeather.weather[0].main,
                };
                availableData.data.set(cityName, cityWeatherData);
            } else {
                cityWeatherData.temp.push(cityWeather.main.temp);
                cityWeatherData.min_temp = Math.min(cityWeatherData.min_temp, cityWeather.main.temp);
                cityWeatherData.max_temp = Math.max(cityWeatherData.max_temp, cityWeather.main.temp);
                cityWeatherData.map_val = cityWeather.weather[0].main;
            }
        }
        await availableData.save();
    } else {
        const newWeatherData = new Weather({
            date: date(),
            data: new Map()
        });
        for (let cityName in cityData) {
            const cityWeather = cityData[cityName];
            let weatherData = {
                city: cityName,
                temp: [cityWeather.main.temp],
                min_temp: cityWeather.main.temp,
                max_temp: cityWeather.main.temp,
                map_val: cityWeather.weather[0].main,
            };
            newWeatherData.data.set(cityName, weatherData);
        }
        await newWeatherData.save();
    }
        await calculateDailySummary();
        const summary = await calculateDailySummary();
        console.log({"Currentlly and Today Weather Summarry Data---------------)=>{ Off all City":summary});   
};



//  calculate current day Weather summary data->>>>>>>
const calculateDailySummary = async () => {
    let availableData = await Weather.findOne({ date: date() });
    if (availableData) {
        let summaries = [];
        for (let i = 0; i < cities.length; i++) {
            let cityWeatherData = availableData.data.get(cities[i]);
            let alertMessage = '';
            if (cityWeatherData && Array.isArray(cityWeatherData.temp) && cityWeatherData.temp.length > 1) {
                const currentTemp = cityWeatherData.temp[cityWeatherData.temp.length - 1];
                const lastTemp = cityWeatherData.temp[cityWeatherData.temp.length - 2];
                if (currentTemp > 33 && lastTemp > 33) {
                    alertMessage = `Alert: The temperature in ${cities[i]} has exceeded 33°C on consecutive readings. Current: ${currentTemp}°C, Previous: ${lastTemp}°C`;
                } else {
                    alertMessage = `The temperature in ${cities[i]} is normal. Current: ${currentTemp}°C`;
                }
                const avgTemp = cityWeatherData.temp.reduce((sum, temp) => sum + temp, 0) / cityWeatherData.temp.length;
                let conditions = Array.isArray(cityWeatherData.map_val) ? cityWeatherData.map_val : [cityWeatherData.map_val];
                let conditionFrequency = {};
                conditions.forEach(condition => {
                    conditionFrequency[condition] = (conditionFrequency[condition] || 0) + 1;
                });
                const dominantCondition = Object.keys(conditionFrequency).reduce((a, b) => 
                    conditionFrequency[a] > conditionFrequency[b] ? a : b);
                
                summaries.push({
                    city: cities[i],
                    avg_temp: avgTemp,
                    max_temp: cityWeatherData.max_temp,
                    min_temp: cityWeatherData.min_temp,
                    dominant_condition: dominantCondition || "Unknown",
                    alert: alertMessage
                });
            } else {
                summaries.push({
                    city: cities[i],
                    data: "Data not found",
                    alert: "Not enough data to determine alerts."
                });
            }
        }
        return summaries; 
    } else {
        return { message: "No weather data available for today." };
    }
};




// calculate Priviousday day Weather summary data ->>>>>>>>>
const pcalculateDailySummary = async () => {
    let availableData = await Weather.findOne({ date: getPreviousDate()});
    if (availableData) {
        let summaries = []; 
        for (let i = 0; i < cities.length; i++) {
            let cityWeatherData = availableData.data.get(cities[i]);
            if (cityWeatherData && Array.isArray(cityWeatherData.temp) && cityWeatherData.temp.length > 0) {
                const avgTemp = cityWeatherData.temp.reduce((sum, temp) => sum + temp, 0) / cityWeatherData.temp.length;
                let conditions = Array.isArray(cityWeatherData.map_val) ? cityWeatherData.map_val : [cityWeatherData.map_val];
                let conditionFrequency = {};
                conditions.forEach(condition => {
                    conditionFrequency[condition] = (conditionFrequency[condition] || 0) + 1;
                });
                const dominantCondition = Object.keys(conditionFrequency).reduce((a, b) => 
                    conditionFrequency[a] > conditionFrequency[b] ? a : b);
                summaries.push({
                    city: cities[i],
                    avg_temp: avgTemp,
                    max_temp: cityWeatherData.max_temp,
                    min_temp: cityWeatherData.min_temp,
                    dominant_condition: dominantCondition || "Unknown"
                });
            } else {
                summaries.push({
                    city: cities[i],
                    Data:"Data not found"
                });
            }
        }
        return summaries; 
    } else {
        return { message: "No weather data available for today." };
    }
};




// api call for every 5 minute ->>>>
cron.schedule('*/1 * * * *', async () => {
    console.log('Fetching weather data...');
    await fetchWeatherData();
});

// currentweathersummry data request->>>>>>     when api call by http://localhost3001/api/current
router.get('/current', async (req, res) => {
    try {
        await fetchWeatherData();
        const summary = await calculateDailySummary();
        res.json({
            message: "Save data And this Is Today Weather summary data",
            summary: summary
        });
    } catch (error) {
        console.error('Error fetching weather data or calculating summary:', error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});



// previousWeatherData request->>>>>>   when api call by  when api call by http://localhost3001/api/previous/
router.get('/previous', async (req, res) => {
    try {
        const previousDate = getPreviousDate(); 
        const previousWeatherData = await Weather.findOne({ date: previousDate });
        if (!previousWeatherData) {
            return res.status(404).json({ message: "No weather data available for the previous day." });
        }
        const summary = await pcalculateDailySummary(); 
        console.log({"Previous Day Weather Summary Data------------- )=>{ Off All City":summary});
        res.json({
            message: "Previous day's weather data retrieved successfully",
            summary: summary
        });
    } catch (error) {
        console.error('Error fetching previous day data:', error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


// Current weather Of today->>>>>>>>>> http://localhost3001/api/
router.get('/', async (req, res) => {
    try {
      const data = await DataFromOpenApi();
      res.json({"Currentlly Weather  Of ":data});
      console.log({"Currentlly Weather Data-------------------------------------------)=> Off All City":data});
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });




module.exports = router;
