import React, { useState, useEffect } from "react";  
import { IDailyForecast } from '../types';
import "./DailyForecast.css";   
  
interface DailyForecastProps {  
  weatherData: IDailyForecast | null;  
}  
  
const DailyForecast: React.FC<DailyForecastProps> = ({ weatherData }) => {  
  const [filter, setFilter] = useState('all');  
  const [isLoaded, setIsLoaded] = useState(false);  
  
  useEffect(() => {  
   if (weatherData && weatherData.currentWeather && weatherData.hourlyForecasts ) {  
    setIsLoaded(true);  
   }  
  }, [weatherData]);  
  
  if (!isLoaded || !weatherData) {  
   return <div>Loading...</div>;  
  }  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
   setFilter(event.target.value);  
  };  
  
  const filteredHourlyForecasts =  
  weatherData  
  && weatherData.hourlyForecasts  
  && Array.isArray(weatherData.hourlyForecasts)  
  && weatherData.hourlyForecasts.length > 0  
  ? weatherData.hourlyForecasts.filter((forecast) => {  
    if (!forecast || !forecast.dt_txt) return false;  
    if (filter === 'all') return true;  
    if (filter === 'morning') return new Date(forecast.dt_txt).getHours() < 12;  
    if (filter === 'night') return new Date(forecast.dt_txt).getHours() >= 12;  
    return false;  
   })  
  : [];

  
  return (  
   <div className="daily-forecast">  
    {weatherData.currentWeather && weatherData.hourlyForecasts.length > 0 ? (  
      <div className="filter-container">  
      <select value={filter} onChange={handleFilterChange}>  
       <option value="all">All</option>  
       <option value="morning">Morning</option>  
       <option value="night">Night</option>  
      </select>  
    </div> 
    
    ): <div className="error-message">  
    <p>Sorry, Hourly data for the day is not available.</p>  
    <p>Please try later</p>  
   </div>}
    
    <div className="hourly-forecasts-container">  
      <div className="hourly-forecasts">  
       {filteredHourlyForecasts.map((forecast, index) => (  
        <div key={index} className="hourly-forecast">  
          {forecast.dt_txt && (  
           <p>{new Date(forecast.dt_txt).toLocaleTimeString()}</p>  
          )}  
          {forecast.weather && forecast.weather[0] && forecast.weather[0].icon && (  
           <img  
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}  
            alt={forecast.weather[0].description}  
           />  
          )}  
          {forecast.main && (  
           <>  
            <p>{forecast.main.temp}°</p>  
            <p>Feels like {forecast.main.feels_like}°</p>  
           </>  
          )}  
        </div>  
       ))}  
      </div>  
    </div>  
    <div className="weather-details-cards-container">  
      <div className="weather-details-cards">  
       {weatherData.currentWeather && weatherData.currentWeather.main && (  
        <div className="card">  
          <h3>Temperature</h3>  
          <p>{weatherData.currentWeather.main.temp}°</p>  
          <span>Feels like {weatherData.currentWeather.main.feels_like}°</span>  
        </div>  
       )}  
       {weatherData.currentWeather && weatherData.currentWeather.main && (  
        <div className="card">  
          <h3>Humidity</h3>  
          <p>{weatherData.currentWeather.main.humidity}%</p>  
          <span>High</span>  
        </div>  
       )}  
       {weatherData.currentWeather && weatherData.currentWeather.wind && (  
        <div className="card">  
          <h3>Wind</h3>  
          <p>{weatherData.currentWeather.wind.speed} kph</p>  
          <span>WSW</span>  
        </div>  
       )}  
        <div className="card">  
          <h3>Precipitation</h3>  
          <p>{weatherData.currentWeather && weatherData.currentWeather.rain ? weatherData.currentWeather.rain["3h"] : 0} mm</p>  
          <span>Over the last hour</span>  
        </div>  
      </div>  
    </div>  
   </div>  
  );  
};  
  
export default DailyForecast;
