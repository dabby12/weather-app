import React from 'react';
import Home from './pages/Home';

function App() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      console.warn("Data has been sent to a third-party server.");
      console.warn("Weather API key is currently in a private repository.");
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
