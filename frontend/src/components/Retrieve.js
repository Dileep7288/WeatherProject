import React from "react";
import { Link } from "react-router-dom";

const Retrieve = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">
        See The Weather Information
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        <Link
          to="/weather"
          className="text-lg border-2 border-solid border-black px-6 py-3 rounded-lg bg-stone-400 hover:bg-lime-500 transition-colors duration-300 text-center"
        >
          Using City Name
        </Link>
        <Link
          to="/air-quality"
          className="text-lg border-2 border-solid border-black px-6 py-3 rounded-lg bg-stone-400 hover:bg-lime-500 transition-colors duration-300 text-center"
        >
          Using Air Quality
        </Link>
        <Link
          to="/temperature"
          className="text-lg border-2 border-solid border-black px-6 py-3 rounded-lg bg-stone-400 hover:bg-lime-500 transition-colors duration-300 text-center"
        >
          Using Temperature
        </Link>
        <Link
          to="/humidity"
          className="text-lg border-2 border-solid border-black px-6 py-3 rounded-lg bg-stone-400 hover:bg-lime-500 transition-colors duration-300 text-center"
        >
          Using Humidity
        </Link>
      </div>
    </div>
  );
};

export default Retrieve;
