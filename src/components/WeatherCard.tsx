import React, { JSX } from "react";
import {
  Wind,
  Droplets,
  Sun,
  CloudRain,
  Snowflake,
  Cloud,
  Wind as WindIcon,
  Eye,
} from "lucide-react";

const weatherIcons: { [key: string]: JSX.Element } = {
  Clear: <Sun className="h-28 w-28 text-white" />,
  Rain: <CloudRain className="h-28 w-28 text-white" />,
  Snow: <Snowflake className="h-28 w-28 text-white" />,
  Clouds: <Cloud className="h-28 w-28 text-white" />,
  Wind: <WindIcon className="h-28 w-28 text-white" />,
  Mist: <Cloud className="h-28 w-28 text-white" />,
  Drizzle: <CloudRain className="h-28 w-28 text-white" />,
};

const weatherColors: { [key: string]: string } = {
  Clear: "bg-gradient-to-b  to-yellow-500 ",
  Rain: "bg-gradient-to-b  to-blue-900",
  Snow: "bg-gradient-to-b  to-gray-500",
  Clouds: "bg-gradient-to-b  to-gray-700",
  Wind: "bg-gradient-to-b  to-teal-600",
  Mist: "bg-gradient-to-b  to-gray-700",
  Drizzle: "bg-gradient-to-b  to-blue-500",
};

interface WeatherCardProps {
  weather: any;
  isCelsius: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isCelsius }) => {
  const convertTemp = (temp: number) =>
    isCelsius ? temp : (temp * 9) / 5 + 32;
  const tempUnit = isCelsius ? "°C" : "°F";

  const weatherType = weather.weather[0].main;
  const bgColor =
    weatherColors[weatherType] ||
    "bg-gradient-to-b from-yellow-300 to-yellow-500";
  const WeatherIcon = weatherIcons[weatherType] || (
    <Sun className="h-28 w-28 text-white" />
  );

  return (
    <div
      className={`flex w-4/5 flex-col justify-between rounded-3xl p-5 shadow-2xl ${bgColor} bg-opacity-70 backdrop-blur-md md:w-3/5 lg:w-[35%]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-5xl font-bold text-white">
            {convertTemp(weather.main.temp).toFixed(1)}
            {tempUnit}
          </p>
          <p className="text-xl font-semibold text-white">
            {weather.name}, {weather.sys.country}
          </p>
        </div>
        <div className="transition-transform duration-300 ease-in-out hover:scale-125">
          {WeatherIcon}
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col space-y-2">
        <div className="flex w-full items-center justify-around rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
          <Eye className="mr-8 h-6 w-6 text-white" />
          <p className="text-2xl font-bold text-white">
            {weather.visibility / 1000} km
          </p>
        </div>
        <div className="flex w-full items-center justify-around rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
          <Wind className="h-6 w-6 text-white" />
          <p className="text-2xl font-bold text-white">
            {weather.wind.speed} m/s
          </p>
        </div>
        <div className="flex w-full items-center justify-around rounded-lg bg-white/20 p-2 transition-transform duration-300 ease-in-out hover:scale-105">
          <Droplets className="mr-10 h-6 w-6 text-white" />
          <p className="text-2xl font-bold text-white">
            {weather.main.humidity} %
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
