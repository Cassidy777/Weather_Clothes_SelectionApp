// App.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { WeatherNameWithIcon } from './weather_names';

const weatherClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const openMeteoApiBase = 'https://api.open-meteo.com/v1/forecast';

const locationList = [
  { enName: 'tokyo', jpName: '東京', lat: 35.689, lon: 139.692 },
  { enName: 'osaka', jpName: '大阪', lat: 34.686, lon: 135.520 },
  { enName: 'saga', jpName: '佐賀', lat: 33.249, lon: 130.300 }
];

const App = () => { 
  const [location, setLocation] = useState(locationList[0]);
  const [weatherInfo, setWeatherInfo] = useState([]); // 気象情報を保持するstate

  const onChangeLocation = (event) => {
    const currentLocationData = locationList.find((lo) => event.target.value === lo.enName);
    setLocation(currentLocationData);
  }

  useEffect(() => {
    (async() => {
      try {
        // APIコールし気象情報取得
        const res = await weatherClient.get(
          `${openMeteoApiBase}?timezone=Asia/Tokyo&latitude=${location.lat}&longitude=${location.lon}&hourly=weather_code,temperature_2m`
        );

        const weatherData = res.data.hourly;
        const weatherDataByTime = weatherData.time.map((time, index) => {
          return {
            datetime: time,
            weatherCode: weatherData.weather_code[index],
            temperature: weatherData.temperature_2m[index] // 気温データを追加
          }
        });
        setWeatherInfo(weatherDataByTime);

      } catch (error) {
        alert(error.message);
      }
    })();
  }, [location])

  return (
    <div>
      <div>
        <select id='location-select' onChange={onChangeLocation}>
          {locationList.map((lo) => (
            <option key={lo.enName} value={lo.enName}>{lo.jpName}</option>
          ))}
        </select>
      </div>
      <h1>{location.jpName} の天気</h1>
      <div>
        <table id='weather-table' border={1}>
          <thead>
            <tr>
              <th>日時</th>
              <th>天気</th>
              <th>気温 (°C)</th>
            </tr>
          </thead>
          <tbody>
            {weatherInfo.map((info) => (
              <tr key={info.datetime}>
                <td>{format(new Date(info.datetime), 'MM/dd - HH:mm')}</td>
                <td><WeatherNameWithIcon weatherCode={info.weatherCode} /></td>
                <td>{info.temperature}°C</td> {/* 気温を表示 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
