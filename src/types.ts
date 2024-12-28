interface IDailyForecast {  
  hourlyForecasts: any[];  
  currentWeather: any;  
}  
  
interface IWeeklyForecast {  
  dailyForecasts: any[];  
}  
  
export type { IDailyForecast, IWeeklyForecast };
