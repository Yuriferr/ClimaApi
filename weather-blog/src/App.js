import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import WeatherDetail from './pages/WeatherDetail/WeatherDetail.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial com os cards */}
        <Route path="/" element={<Home />} />
        
        {/* Página de detalhes do clima */}
        <Route path="/weather/:city" element={<WeatherDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
