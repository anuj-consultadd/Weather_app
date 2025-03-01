import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar.tsx";
import WeatherDetails from "./components/WeatherDetailes.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherBackgrounds: { [key: string]: string } = {
  Rain: "/images/rainy.jpg",
  Snow: "/images/snowy.jpg",
  Clear: "/images/sunny.jpg",
  Clouds: "/images/cloudy.jpg",
  Wind: "/images/windy.jpg",
  Mist: "/images/cloudy.jpg",
  Fog: "/images/cloudy.jpg",
  Haze: "/images/cloudy.jpg",
  Drizzle: "/images/rainy.jpg",
};

const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Invalid city name. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  const weatherType = weather?.weather[0]?.main || "Clear";
  const backgroundImage =
    weatherBackgrounds[weatherType] || "/images/sunny.png";

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-start gap-5 bg-cover bg-center bg-no-repeat p-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <button
        onClick={toggleTemperature}
        className="mt-4 rounded-lg bg-white/30 px-6 py-2 font-semibold text-gray-500 shadow-sm shadow-gray-300 transition duration-300 ease-in-out hover:bg-white/50"
      >
        Toggle °C / °F
      </button>
      <SearchBar fetchWeather={fetchWeather} />
      {weather && <WeatherCard weather={weather} isCelsius={isCelsius} />}
      {weather && <WeatherDetails weather={weather} isCelsius={isCelsius} />}
    </div>
  );
};

export default App;
