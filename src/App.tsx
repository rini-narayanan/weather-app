import React, { useState, useEffect } from "react";   
import { BrowserRouter, Route, Routes } from "react-router-dom";   
import SearchBar from "./components/SearchBar";   
import DailyForecast from "./components/DailyForecast";   
import WeeklyForecast from "./components/WeeklyForecast";   
import Header from "./components/CommonHeader";  
import { IDailyForecast, IWeeklyForecast } from './types';  
  
import "./App.css";    
   
const App: React.FC = () => {   
  const [weatherData, setWeatherData] = useState<IDailyForecast | null>(null);   
  const [weeklyWeatherData, setWeeklyWeatherData] = useState<IWeeklyForecast | null>(null);   
  const [city, setCity] = useState<string>("Saskatoon");   
  const [error, setError] = useState<string | null>(null);   
   
 const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  
   
  const fetchWeatherData = async (city: string) => {   
   try {   
    const currRes = await fetch(   
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`   
    );   
    if (!currRes.ok) throw new Error("City not found");   
    
    const currData = await currRes.json();   
    
    const weeklyRes = await fetch(   
    `https://pro.openweathermap.org/data/2.5/forecast?lat=${currData.coord.lat}&lon=${currData.coord.lon}&appid=${API_KEY}&units=metric`   
    );   
    
    if (!weeklyRes.ok) throw new Error("Failed to fetch weather data");   
    
    const weeklyJson = await weeklyRes.json();   
    const dailyForecast = getDailyForecast(currData, weeklyJson.list);   
    const weeklyForecast = getWeeklyForecast(weeklyJson.list);   
    setWeatherData(dailyForecast);   
    setWeeklyWeatherData(weeklyForecast);   
    setError(null);   
   } catch (err: any) {   
      setError(err.message || "An error occurred");   
   }   
  };   
    
  const getDailyForecast = (currentWeatherData: any, forecastList: any[]) => {   
    const today = new Date();   
    const todayDate = today.toLocaleDateString();   
    const hourlyForecasts = forecastList.filter((forecast) => {   
      const date = new Date(forecast.dt_txt);   
      return date.toLocaleDateString() === todayDate;   
   });   
    
   return {   
    hourlyForecasts,   
    currentWeather: {   
      main: currentWeatherData.main,   
      weather: currentWeatherData.weather,   
      wind: currentWeatherData.wind,   
    },   
   };   
  };   
  
  const getWeeklyForecast = (forecastList: any[]) => {   
    const today = new Date();   
    const todayDate = today.toLocaleDateString();   
    const dailyForecasts = forecastList.filter((forecast) => {   
      const date = new Date(forecast.dt_txt);   
      return date.toLocaleDateString() !== todayDate;   
    });   
    
   interface IWeeklyData {   
    day: string;   
    morningTemp: number;   
    nightTemp: number;   
    weather: any;   
    windSpeedMin: number;   
    windSpeedMax: number;  
   }   
    
   const weeklyForecasts: IWeeklyData[] = [];   
   const days: { [key: string]: any[] } = {};   
    
   dailyForecasts.forEach((forecast) => {   
    const date = new Date(forecast.dt_txt);   
    const day = date.toLocaleDateString();   
    if (!days[day]) {   
      days[day] = [];   
    }   
    days[day].push(forecast);   
   });   
    
   Object.keys(days).forEach((day) => {   
    const dayForecasts = days[day];   
    const morningTemp = dayForecasts[0].main.temp;   
    const nightTemp = dayForecasts[dayForecasts.length - 1].main.temp;   
    const weather = dayForecasts[0].weather[0];   
    const windSpeedMin = Math.min(...dayForecasts.map((forecast) => forecast.wind.speed));   
    const windSpeedMax = Math.max(...dayForecasts.map((forecast) => forecast.wind.speed));   
    
    weeklyForecasts.push({   
      day,   
      morningTemp,   
      nightTemp,   
      weather,  
      windSpeedMin,  
      windSpeedMax  
    });   
   });   
    
   return {   
    dailyForecasts: weeklyForecasts,   
   };   
  };  
   
  useEffect(() => {   
  fetchWeatherData(city);   
  }, [city]);   
   
  return (   
  <BrowserRouter>   
   <div className="app-container">   
    <SearchBar onSearch={(searchCity) => setCity(searchCity)} />   
    <Header   
    city={city}   
    currentTemp={weatherData?.currentWeather?.main?.temp ?? 0}   
    morningTemp={weatherData?.hourlyForecasts[0]?.main?.temp ?? 0}   
    nightTemp={weatherData?.hourlyForecasts[weatherData.hourlyForecasts.length - 1]?.main?.temp ?? 0}   
    weatherDescription={weatherData?.currentWeather?.weather[0]?.description ?? ""}   
    weatherIcon={weatherData?.currentWeather?.weather[0]?.icon ?? ""}   
   />   
    {error ? (   
     <div className="error-message">{error}</div>   
    ) : (   
     <Routes>   
      <Route path="/" element={<DailyForecast weatherData={weatherData} />} />   
      <Route path="/weekly" element={<WeeklyForecast weatherData={weeklyWeatherData} />} />   
     </Routes>   
    )}   
   </div>   
  </BrowserRouter>   
  );   
};   
   
export default App;
