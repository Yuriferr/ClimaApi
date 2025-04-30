import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar o hook de navegação
import Card from "./components/Card/Card.js";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayShowers,
} from "react-icons/wi";
import { FiSearch } from "react-icons/fi"; // Importar ícone de pesquisa

const weatherIcons = {
  Clear: <WiDaySunny size={50} color="#f39c12" />,
  Clouds: <WiCloud size={50} color="#7f8c8d" />,
  Rain: <WiRain size={50} color="#3498db" />,
  Snow: <WiSnow size={50} color="#95a5a6" />,
  Thunderstorm: <WiThunderstorm size={50} color="#9b59b6" />,
  Drizzle: <WiDayShowers size={50} color="#1abc9c" />,
  Mist: <WiFog size={50} color="#bdc3c7" />,
};

export default function Home() {
  const [localWeather, setLocalWeather] = useState(null);
  const [search, setSearch] = useState(""); // Estado para armazenar o valor da pesquisa
  const navigate = useNavigate(); // Hook para navegação

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=18cad22e69252aa4dd95daa8da20c3f3&units=metric&lang=pt`
      );
      setLocalWeather(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/weather/${search.trim()}`); // Redireciona para a página com o nome da cidade
    }
  };

  return (
    <div className="Home">
      {localWeather ? (
        <header>
          <div className="icon">
            {weatherIcons[localWeather.weather[0]?.main] || (
              <WiDaySunny size={50} color="#f39c12" />
            )}
          </div>
          <span>
            <section className="temperature">
              <h3>{localWeather.main?.temp}°C</h3>
              <p>{localWeather.weather[0]?.description}</p>
            </section>

            <section className="name">
              <p>{localWeather.name}</p>
              <p><strong>Umidade:</strong> {localWeather.main?.humidity}%</p>
              <p><strong>Vento:</strong> {localWeather.wind?.speed} m/s</p>
            </section>
          </span>

          {/* Barra de pesquisa */}
          <form className="search-container" onSubmit={handleSearch}>
            <input
              type="text"
              id="search"
              placeholder="Digite o nome da cidade"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <FiSearch size={20} color="#333" /> {/* Ícone de pesquisa */}
            </button>
          </form>
        </header>
      ) : (
        <div className="loading">Carregando...</div>
      )}

      <h2>Previsão do tempo em Países do Mundo</h2>
      <div className="cards-container">
        <Card local={"Brasil"} />
        <Card local={"Estados Unidos"} />
        <Card local={"França"} />
        <Card local={"Alemanha"} />
        <Card local={"Japão"} />
      </div>

      <h2>Previsão do tempo nas Cidades do Brasil</h2>
      <div className="cards-container">
        <Card local={"São Paulo"} />
        <Card local={"Rio de Janeiro"} />
        <Card local={"Belo Horizonte"} />
        <Card local={"Salvador"} />
        <Card local={"Curitiba"} />
      </div>
    </div>
  );
}
