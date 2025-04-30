import React from 'react';
import './Card.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayShowers } from 'react-icons/wi';

const weatherIcons = {
    Clear: <WiDaySunny size={50} color="#f39c12" />, // Céu limpo
    Clouds: <WiCloud size={50} color="#7f8c8d" />, // Nublado
    Rain: <WiRain size={50} color="#3498db" />, // Chuva
    Snow: <WiSnow size={50} color="#95a5a6" />, // Neve
    Thunderstorm: <WiThunderstorm size={50} color="#9b59b6" />, // Tempestade
    Drizzle: <WiDayShowers size={50} color="#1abc9c" />, // Garoa
    Mist: <WiFog size={50} color="#bdc3c7" />, // Névoa
};

export default function Card({ local }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=18cad22e69252aa4dd95daa8da20c3f3&units=metric&lang=pt`);
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchWeatherData();
    }, [local]);

    if (!data) {
        return (
            <div className="Card">
                <h2>{local}</h2>
                <p>Loading...</p>
            </div>
        );
    }

    // Obtém o tipo de clima principal (ex.: "Clear", "Clouds")
    const weatherType = data.weather[0]?.main;
    const weatherIcon = weatherIcons[weatherType] || <WiDaySunny size={50} color="#f39c12" />; // Ícone padrão

    return (
        <div className="Card">
            <h2>{local}</h2>
            <div className='icon'>{weatherIcon}</div>
            <div className="grid">
                <p><strong>Temperatura:</strong> {data.main?.temp}°C</p>
                <p><strong>Clima:</strong> {data.weather[0]?.description}</p>
                <p><strong>Umidade:</strong> {data.main?.humidity}%</p>
                <p><strong>Velocidade do Vento:</strong> {data.wind?.speed} m/s</p>
            </div>
        </div>
    );
}