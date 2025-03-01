// SearchBar.tsx
import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  fetchWeather: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-4/5 items-center justify-center gap-2 md:w-3/5 lg:w-[35%]"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city..."
        required
        className="w-full rounded-lg border-0 bg-white px-3 py-2 text-lg text-black backdrop-blur-lg duration-300 ease-in-out focus:bg-white/20"
      />
      <button
        type="submit"
        className="rounded-full bg-white/50 p-3 text-2xl font-black text-white duration-300 ease-in-out hover:bg-white/20"
      >
        <Search />
      </button>
    </form>
  );
};

export default SearchBar;
