import React, { useState, useEffect, useRef } from "react";
import { Weather_URL } from "../utils/constants";
import search_icon from "../assets/search.png";

const Humidity = () => {
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    weatherData("");
  }, []);

  const weatherData = async (humidity) => {
    try {
      const data = await fetch(
        `${Weather_URL}weather_data/humidity/${humidity}`
      );

      const json = await data.json();
      if (json.error) {
        setMessage(
          `Couldn't get the weater data for the entered humidity ${humidity}`
        );
        setData([]);
      } else {
        const valArr = Object.entries(json).map(([key, val]) => ({ key, val }));
        setData(valArr);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <div className="flex flex-col items-center mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-md max-w-lg">
      <h2 className="text-center text-2xl font-bold mb-6">
        Get Weather Data Using Humidity
      </h2>
      <div className="flex gap-4 justify-center mb-4 ">
        <input
          className="border border-solid border-black rounded-full pl-7 py-2 w-full max-w-sm"
          ref={inputRef}
          type="text"
          placeholder="Enter City Humidity"
        />
        <img
          className="w-12 p-4 bg-black cursor-pointer rounded-full"
          src={search_icon}
          alt="Search"
          onClick={() => weatherData(inputRef.current.value)}
        />
      </div>
      <div className="text-center m-4">
        <table className="min-w-full bg-white border-2 border-gray-300 ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200 font-semibold">
                City Name
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 font-semibold">
                City Temperature
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 font-semibold">
                City Humidity
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 font-semibold">
                City Air Quality
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((city) => (
              <tr key={city.key} className="even:bg-gray-100">
                <td className="py-2 px-4 border-b">{city?.key}</td>
                <td className="py-2 px-4 border-b">{city?.val?.temperature}</td>
                <td className="py-2 px-4 border-b">{city?.val?.humidity}</td>
                <td className="py-2 px-4 border-b">{city?.val?.air_quality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <p className="m-3 font-bold text-red-400">{message}</p>}
    </div>
  );
};

export default Humidity;
