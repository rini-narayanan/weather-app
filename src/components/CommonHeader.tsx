import React from "react";   
import { useNavigate, useLocation } from "react-router-dom";   
import "./CommonHeader.css";   
   
interface CommonHeaderProps {   
  city: string;   
  currentTemp: number;   
  morningTemp: number;   
  nightTemp: number;   
  weatherDescription: string;   
  weatherIcon: string;   
}   
   
const CommonHeader: React.FC<CommonHeaderProps> = ({ city, currentTemp, morningTemp, nightTemp, weatherDescription, weatherIcon }) => {   
  const navigate = useNavigate();   
  const location = useLocation();   
   
  const handleDailyClick = () => {   
  navigate("/");   
  };   
   
  const handleWeeklyClick = () => {   
  navigate("/weekly");   
  };   
   
  return (   
  <div className="common-header">   
   <div className="header">   
    <h2>Weather App</h2>   
    <p>{city}</p>   
   </div>   
   <div className="main-display">   
    <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDescription} />   
    <p>It's {currentTemp}° now</p>   
    <p>{weatherDescription}</p>   
    <p>Day {morningTemp}° • Night {nightTemp}°</p>   
   </div>   
   <div className="tab-navigation">   
    <button className={location.pathname === "/" ? "active" : ""}  onClick={handleDailyClick}>   
     Today   
    </button>   
    <button className={location.pathname === "/weekly" ? "active" : ""}  onClick={handleWeeklyClick}>This Week</button>   
   </div>   
  </div>   
  );   
};   
   
export default CommonHeader;
