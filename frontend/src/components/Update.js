import React, { useRef, useState } from "react";
import { Weather_URL } from "../utils/constants";

const Update = () => {
  const cityRef = useRef();
  const tempRef = useRef();
  const humidityRef = useRef();
  const airQualityRef = useRef();
  const [message, setMessage] = useState("");

  const updateWeatherData = async () => {
    const cityName = cityRef.current.value;
    const temp = parseFloat(tempRef.current.value);
    const humidity = parseFloat(humidityRef.current.value);
    const airQuality = parseFloat(airQualityRef.current.value);

    try {
      const data = await fetch(
        `${Weather_URL}update_city_weather_data/${cityName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            temp,
            humidity,
            air_quality: airQuality,
          }),
        }
      );

      const json = await data.json();

      if (data.success) {
        setMessage(`Successfully updated weather data for ${cityName}`);
        cityRef.current.value = "";
        tempRef.current.value = "";
        humidityRef.current.value = "";
        airQualityRef.current.value = "";
      } else {
        setMessage(json.error || "Failed to update data. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error Updating the data please try again");
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-md bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-bold mb-4 m-4">
          Update Weather Data
        </h2>
        <input
          className="w-64 p-2 border border-gray-300 rounded-xl"
          type="text"
          ref={cityRef}
          placeholder="Enter city name"
        />
        <input
          className="w-64 p-2 border border-gray-300 rounded-xl"
          type="number"
          ref={tempRef}
          placeholder="Temperature (°C)"
        />
        <input
          className="w-64 p-2 border border-gray-300 rounded-xl"
          type="number"
          ref={humidityRef}
          placeholder="Humidity (%)"
        />
        <input
          className="w-64 p-2 border border-gray-300 rounded-xl"
          type="number"
          ref={airQualityRef}
          placeholder="Air Quality (μg/m³)"
        />
        <div className="flex justify-center">
          <button
            className="w-28 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
            onClick={updateWeatherData}
          >
            Update
          </button>
        </div>
        {message && <p className="m-3 font-bold text-red-400">{message}</p>}
      </div>
    </div>
  );
};

export default Update;
