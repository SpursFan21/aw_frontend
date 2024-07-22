import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('/api/weather')
      .then(response => setWeather(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="App">
      <h1>AucklandWeather</h1>
      <MapContainer center={[-36.8485, 174.7633]} zoom={10} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      {weather ? (
        <div>
          <h2>Temperature: {weather.data.timelines[0].intervals[0].values.temperature}°C</h2>
          <h2>Precipitation: {weather.data.timelines[0].intervals[0].values.precipitationIntensity} mm/hr</h2>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
