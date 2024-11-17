import React, { useRef, useState } from "react";
import { Weather_URL } from "../utils/constants";

const Insert = () => {
  const cityRef = useRef();
  const tempRef = useRef();
  const humidityRef = useRef();
  const airQualityRef = useRef();
  const [message, setMessage] = useState("");

  const submitData = async () => {
    const cityName = cityRef.current.value;
    const temp = tempRef.current.value;
    const humidity = humidityRef.current.value;
    const airQuality = airQualityRef.current.value;

    try {
      const data = await fetch(`${Weather_URL}insert_or_update_weather_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [cityName]: {
            temp,
            humidity,
            air_quality: airQuality,
          },
        }),
      });

      const json = await data.json();
      if (data.ok) {
        setMessage(`Successfully inserted weather data for ${cityName}`);

        cityRef.current.value = "";
        tempRef.current.value = "";
        humidityRef.current.value = "";
        airQualityRef.current.value = "";
      } else {
        setMessage(
          `Error inserting data for ${cityName}. Please check the data.`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error inserting data. Please try again later.");
      return;
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-md bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-xl font-bold mb-4 m-4">
          Insert Weather Data
        </h2>
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="text"
          ref={cityRef}
          placeholder="City Name"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="number"
          ref={tempRef}
          placeholder="Enter Temperature"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="numer"
          ref={humidityRef}
          placeholder="Enter Humidity"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="number"
          ref={airQualityRef}
          placeholder="Enter Air Quality"
        />
        <button
          className="w-28 p-2 bg-blue-500 text-white rounded hover:bg-blue-600  "
          onClick={submitData}
        >
          Submit
        </button>
        {message && <p className="m-3 font-bold text-red-400">{message}</p>}
      </div>
    </div>
  );
};

export default Insert;
