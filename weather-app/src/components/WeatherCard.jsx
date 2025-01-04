import React from 'react';

const WeatherCard = ({ weather, unit, toggleUnit }) => {
  const { location, current } = weather;

  // Safely access air quality index
  const airQualityIndex = current.air_quality?.['us-epa-index'] || 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-700">{location.name}</h2>
      <p className="text-gray-500">{location.region}, {location.country}</p>
      <div className="my-4">
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="inline-block"
        />
        <p className="text-3xl font-bold">
          {unit === 'C' ? `${current.temp_c}°C` : `${current.temp_f}°F`}
        </p>
        <p className="text-gray-600">{current.condition.text}</p>
      </div>
      <p className="text-sm text-gray-500">Humidity: {current.humidity}%</p>
      <p className="text-sm text-gray-500">Wind: {current.wind_kph} kph</p>
      <p className="text-sm text-gray-500">Air Quality: {airQualityIndex}</p>
      <button
        onClick={toggleUnit}
        className="bg-gray-200 px-2 py-1 rounded mt-2"
      >
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherCard;
