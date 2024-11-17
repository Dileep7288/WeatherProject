import React from "react";
import { Link } from "react-router-dom";
import Retrieve from "./Retrieve";

const Home = () => {
  return (
    <div className="p-8 bg-pale-green opacity-70 rounded-xl">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Weather App</h1>
      <p className="text-lg mb-4">
        Stay informed with real-time weather updates and forecasts right at your
        fingertips. Our app provides you with accurate and up-to-date weather
        information for various locations around the globe.
      </p>
      <p className="text-lg mb-4">
        Explore detailed metrics including temperature, humidity, air quality,
        and more. Whether you're planning your day or looking for specific
        weather conditions, our app offers a user-friendly interface to get the
        information you need quickly.
      </p>
      <p className="text-lg mb-4">
        Features:
        <ul className="list-disc pl-5 mt-2">
          <li>Current weather conditions and forecasts</li>
          <li>Temperature, humidity, and air quality metrics</li>
          <li>Search for weather information by city or location</li>
          <li>Intuitive design for easy navigation and use</li>
        </ul>
      </p>
      <p className="text-lg">
        Get started for weather updates and make the most of your daily
        planning. Enjoy a seamless experience with our comprehensive weather
        app!
      </p>
      <Link
        to="/retrieve"
        className="block mt-8 px-4 py-2 bg-blue-500 text-2xl font-bold rounded-lg hover:bg-blue-600 text-center"
      >
        Click to see weather information
      </Link>
    </div>
  );
};

export default Home;
