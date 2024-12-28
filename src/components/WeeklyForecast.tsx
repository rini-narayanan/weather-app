import React from "react";  
import {IWeeklyForecast } from '../types';
import "./WeeklyForecast.css";  
  
interface WeeklyForecastProps {  
  weatherData: IWeeklyForecast | null;  
}  
  
const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weatherData }) => {  
  if (!weatherData) {  
   return <div>Loading...</div>;  
  }  
  
  return (  
   <div className="weekly-forecast">  
    <div className="days-forecasts-container">  
      <div className="days-forecasts">  
       {weatherData.dailyForecasts.map((forecast, index) => (  
        <div key={index} className="day-forecast">  
          <div className="date">  
           <p>{forecast.day}</p>  
           <img  
            src={`https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`}  
            alt={forecast.weather.description}  
           />  
          </div>  
          <div className="temp">  
           <p>Morning: <span className="morning-temp">{forecast.morningTemp}°</span></p>  
           <p>Night: <span className="night-temp">{forecast.nightTemp}°</span></p>  
          </div>  
          <div className="wind">  
           <p>Wind: {forecast.windSpeedMin} - {forecast.windSpeedMax} km/h</p>  
          </div>  
        </div>  
       ))}  
      </div>  
    </div>  
   </div>  
  );  
};  
  
export default WeeklyForecast;
