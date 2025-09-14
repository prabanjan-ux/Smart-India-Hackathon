import React from "react";
import "../styles/Dashboard.css"
import Header from "../components/Header.jsx";
import MetricCard from "../components/MetricCard.jsx";
import FactBox from "../components/FactBox.jsx";


function App() {
  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <h1 className="title">Environmental Dashboard</h1>
        <p className="subtitle">
          Monitor real-time environmental data and learn how to make a positive
          impact on our planet.
        </p>

        <div className="metrics-grid">
          <MetricCard
            color="#4CAF50"
            icon="🌬️"
            value="42"
            unit="AQI"
            title="Air Quality Index"
            desc="Good air quality. Great for outdoor activities!"
          />
          <MetricCard
            color="#FF7043"
            icon="🌡️"
            value="24°"
            unit="Celsius"
            title="Temperature"
            desc="Pleasant temperature with mild conditions."
          />
          <MetricCard
            color="#29B6F6"
            icon="💧"
            value="65"
            unit="%"
            title="Humidity Level"
            desc="Comfortable humidity levels for the season."
          />
          <MetricCard
            color="#FBC02D"
            icon="☀️"
            value="6"
            unit="Moderate"
            title="UV Index"
            desc="Moderate UV levels. Sun protection recommended."
          />
          <MetricCard
            color="#EF5350"
            icon="🌲"
            value="387"
            unit="ppm CO₂"
            title="Carbon Emissions"
            desc="Current atmospheric CO₂ concentration levels."
          />
          <MetricCard
            color="#0288D1"
            icon="🌊"
            value="8.2"
            unit="pH Level"
            title="Water Quality Index"
            desc="Excellent water quality with optimal pH balance."
          />
        </div>

        <FactBox />
      </main>
    </div>
  );
}

export default App;
