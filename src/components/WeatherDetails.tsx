import React, { useState } from "react";
import {
  ThermometerSnowflakeIcon,
  ThermometerSun,
  Sunrise,
  Sunset,
  CloudRain,
  Compass,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface WeatherDetailsProps {
  weather: any;
  isCelsius: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weather,
  isCelsius,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const convertTemp = (temp: number) =>
    isCelsius ? temp : (temp * 9) / 5 + 32;
  const tempUnit = isCelsius ? "°C" : "°F";

  return (
    <div className="flex  w-full flex-col rounded-xl bg-white/30 p-5 backdrop-blur-2xl md:w-3/5 lg:w-[35%]">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mb-4 flex flex-col items-center">
          <p className="text-4xl font-bold text-white">
            {weather.weather[0].main}
          </p>
          <p className="font-semibold text-white">
            {weather.weather[0].description}
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-10 w-10 text-white" />
        ) : (
          <ChevronDown className="h-10 w-10 text-white" />
        )}
      </div>
      {isOpen && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <ThermometerSun className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Max Temp: {convertTemp(weather.main.temp_max).toFixed(1)}{" "}
              {tempUnit}
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <ThermometerSnowflakeIcon className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Min Temp: {convertTemp(weather.main.temp_min).toFixed(1)}{" "}
              {tempUnit}
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <CloudRain className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Pressure: {weather.main.pressure} hPa
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <Compass className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Wind Direction: {weather.wind.deg}°
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <Sunrise className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Sunrise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <Sunset className="mr-2 h-6 w-6 text-white" />
            <p className="font-bold text-white">
              Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
