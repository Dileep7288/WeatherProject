import React, { useState, useEffect, useRef } from "react";
import search_icon from "../assets/search.png";
import { Weather_URL } from "../utils/constants";

const Weather = () => {
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    weatherData("");
  }, []);

  const weatherData = async (city) => {
    try {
      const data = await fetch(`${Weather_URL}weather_data/city/${city}`);
      const json = await data.json();
      if (json.error) {
        setMessage(`Couldn't fetch Data for the entered city name ${city}`);
        setData([]);
      } else {
        setData(json);
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-md bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-xl font-bold mb-4 m-4">
        Get Weather Data Using City Name
      </h2>
      <div className="flex gap-4 justify-center">
        <input
          className="border border-solid border-black rounded-full pl-7"
          ref={inputRef}
          type="text"
          placeholder="Enter City Name"
        />
        <img
          className="w-12 p-4 bg-black cursor-pointer rounded-full"
          src={search_icon}
          alt="Search"
          onClick={() => weatherData(inputRef.current.value)}
        />
      </div>
      <div className="text-center m-4">
        <p>City Name : {data.cityname}</p>
        <p>City Temperature : {data.temperature}</p>
        <p>City Humidity : {data.humidity}</p>
        <p>City AirQuality : {data.air_quality}</p>
      </div>
      {message && <p className="m-3 font-bold text-red-400">{message}</p>}
    </div>
  );
};

export default Weather;
