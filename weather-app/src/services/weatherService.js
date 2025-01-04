import axios from 'axios';

const API_KEY = 'bf6bbf258c634cb0bd6132645250401';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: { key: API_KEY, q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};


export const fetchForecast = async (city) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return response.json();
  };
  
