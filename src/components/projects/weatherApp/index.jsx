import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from "react-icons/wi";

const WeatherApp = () => {
    const [location, setLocation] = useState("Bengaluru");
    const [oldLocation, setOldLocation] = useState("Bengaluru");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch weather data
    const fetchWeather = async () => {
        setLoading(true);
        setError("");
        setWeather(null);
        try {
            // Step 1: Get latitude & longitude from location name (Geocoding)
            const geoResponse = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`
            );

            if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
                throw new Error("Location not found!");
            }

            const { latitude, longitude } = geoResponse.data.results[0];

            // Step 2: Fetch weather data
            const weatherResponse = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
            );

            setWeather(weatherResponse.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location) fetchWeather();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
        setOldLocation(location);
    };

    // Weather icon based on condition
    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case 0: return <WiDaySunny />;
            case 1: case 2: case 3: return <WiCloudy />;
            case 61: case 63: case 65: return <WiRain />;
            case 71: case 73: case 75: return <WiSnow />;
            case 95: case 96: case 99: return <WiThunderstorm />;
            default: return <WiDaySunny />;
        }
    };

    return (
        <WeatherContainer>
            <Title>Weather App</Title>

            <SearchForm onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (e.g., London)"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Get Weather"}
                </button>
            </SearchForm>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {location === oldLocation && <>
                {weather && (
                    <WeatherCard>
                        <Location>
                            {location} ({weather.latitude?.toFixed(2)}°N, {weather.longitude?.toFixed(2)}°E)
                        </Location>

                        <WeatherIcon>
                            {getWeatherIcon(weather.current_weather.weathercode)}
                            <Temperature>{weather.current_weather.temperature}°C</Temperature>
                        </WeatherIcon>

                        <WeatherDetails>
                            <DetailItem>
                                <span>Condition:</span> {weather.current_weather.weathercode}
                            </DetailItem>
                            <DetailItem>
                                <span>Wind Speed:</span> {weather.current_weather.windspeed} km/h
                            </DetailItem>
                            <DetailItem>
                                <span>Humidity:</span> {weather.hourly?.relativehumidity_2m[0]}%
                            </DetailItem>
                        </WeatherDetails>
                    </WeatherCard>
                )}
            </>}

        </WeatherContainer>
    );
};

// Styled Components
const WeatherContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      background: #cccccc;
    }
  }
`;

const WeatherCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Location = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #444;
`;

const WeatherIcon = styled.div`
  font-size: 4rem;
  margin: 1rem 0;
  color: #ff8c00;
`;

const Temperature = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const WeatherDetails = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const DetailItem = styled.p`
  margin: 0.5rem 0;
  span {
    font-weight: bold;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 1rem 0;
`;

export default WeatherApp;