import React, { useState, useRef } from "react";
import { Weather_URL } from "../utils/constants";

const Delete = () => {
  const inputRef = useRef();
  const [message, setMessage] = useState("");

  const deleteWeatherData = async (cityName) => {
    try {
      const data = await fetch(
        `${Weather_URL}delete_city_weather_data/${cityName}`,
        {
          method: "DELETE",
        }
      );

      const json = await data.json();
      if (json.success) {
        setMessage(`Successfully deleted weather data for city: ${cityName}`);
      } else {
        setMessage(
          `City not found in the database with the city : ${cityName}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        "Error Deleting the data please check city name and try again"
      );
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-md bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-xl font-bold mb-4 m-4">
        Delete Weather Data
      </h2>
      <input
        className="p-3 m-3 border border-solid border-black rounded-xl"
        type="text"
        ref={inputRef}
        placeholder="Enter city name"
      />
      <button
        className="m-3 border border-solid border-black p-3 rounded-xl bg-zinc-500"
        onClick={() => deleteWeatherData(inputRef.current.value)}
      >
        Delete
      </button>
      {message && <p className="m-3 font-bold text-red-400">{message}</p>}
    </div>
  );
};

export default Delete;
