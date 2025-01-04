import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { fetchWeather, fetchForecast } from '../services/weatherService';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('C');
  const [view, setView] = useState('today'); // Options: 'today', '5-days', 'week'

  const handleSearch = async (city) => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      console.log(forecast);

      setWeather(weatherData);
      setForecast(forecastData.forecast.forecastday);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await fetchWeather(`${latitude},${longitude}`);
            const forecastData = await fetchForecast(`${latitude},${longitude}`);
            console.log(forecast);

            setWeather(weatherData);
            setForecast(forecastData.forecast.forecastday);
          } catch (err) {
            setError('Could not fetch weather data for your location.');
          }
        },
        () => setError('Geolocation is not enabled or supported.')
      );
    }
  }, []);

  const renderContent = () => {
    if (view === 'today') {
      return weather ? (
        <WeatherCard weather={weather} unit={unit} toggleUnit={toggleUnit} />
      ) : (
        <p className="text-gray-500">Loading today’s weather...</p>
      );
    } else if (view === '5-days') {
      return forecast ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.slice(0, 5).map((day) => (
            <div key={day.date} className="bg-white rounded-lg shadow p-4">
              <p className="font-bold">{day.date}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>
                {unit === 'C' ? `${day.day.avgtemp_c}°C` : `${day.day.avgtemp_f}°F`}
              </p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading 5-day forecast...</p>
      );
    } else if (view === 'week') {
      return forecast ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecast.map((day) => (
            <div key={day.date} className="bg-white rounded-lg shadow p-4">
              <p className="font-bold">{day.date}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>
                {unit === 'C' ? `${day.day.avgtemp_c}°C` : `${day.day.avgtemp_f}°F`}
              </p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading weekly weather...</p>
      );
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 overflow-auto">
        <SearchBar onSearch={handleSearch} />
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setView('today')}
            className={`px-4 py-2 rounded ${
              view === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setView('5-days')}
            className={`px-4 py-2 rounded ${
              view === '5-days' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            5 Days
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded ${
              view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Week
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
    

  );
};

export default Home;
