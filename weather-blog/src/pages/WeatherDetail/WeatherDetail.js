import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './WeatherDetail.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayShowers } from 'react-icons/wi';

const weatherIcons = {
    Clear: <WiDaySunny size={50} color="#f39c12" />,
    Clouds: <WiCloud size={50} color="#7f8c8d" />,
    Rain: <WiRain size={50} color="#3498db" />,
    Snow: <WiSnow size={50} color="#95a5a6" />,
    Thunderstorm: <WiThunderstorm size={50} color="#9b59b6" />,
    Drizzle: <WiDayShowers size={50} color="#1abc9c" />,
    Mist: <WiFog size={50} color="#bdc3c7" />,
};

export default function WeatherDetail() {
    const { city } = useParams(); // Obtém o nome da cidade da URL
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18cad22e69252aa4dd95daa8da20c3f3&units=metric&lang=pt`
                );
                setWeatherData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchWeather();
    }, [city]);

    if (!weatherData) {
        return <p>Carregando dados do clima...</p>;
    }

    const weatherType = weatherData.weather[0]?.main;
    const weatherIcon = weatherIcons[weatherType] || <WiDaySunny size={50} color="#f39c12" />;

    return (
        <div className="WeatherDetail">
            <h1>Detalhes do Clima em {weatherData.name}</h1>
            <div className="icon">{weatherIcon}</div>
            <p><strong>Temperatura:</strong> {weatherData.main?.temp}°C</p>
            <p><strong>Sensação Térmica:</strong> {weatherData.main?.feels_like}°C</p>
            <p><strong>Clima:</strong> {weatherData.weather[0]?.description}</p>
            <p><strong>Umidade:</strong> {weatherData.main?.humidity}%</p>
            <p><strong>Pressão Atmosférica:</strong> {weatherData.main?.pressure} hPa</p>
            <p><strong>Velocidade do Vento:</strong> {weatherData.wind?.speed} m/s</p>
            <p><strong>Direção do Vento:</strong> {weatherData.wind?.deg}°</p>
            <p><strong>Coordenadas:</strong> Latitude {weatherData.coord?.lat}, Longitude {weatherData.coord?.lon}</p>
        </div>
    );
}