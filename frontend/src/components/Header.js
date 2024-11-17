import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="bg-gray-300 shadow-md rounded-lg mx-auto p-4 my-3"
      style={{ width: "90%", maxWidth: "800px" }}
    >
      <div className="mx-auto">
        <ul className="flex flex-col gap-y-6 justify-center p-4">
          <li className="border-2 border-solid border-black hover:bg-blue-500  px-6 py-3 rounded-lg transition-colors duration-300 text-xl font-semibold text-center">
            <Link to="/insert">Insert Data</Link>
          </li>
          <li className="border-2 border-solid border-black hover:bg-blue-500 px-6 py-3 rounded-lg transition-colors duration-300 text-xl font-semibold text-center">
            <Link to="/update">Update Data</Link>
          </li>
          <li className="border-2 border-solid border-black hover:bg-blue-500 px-6 py-3 rounded-lg transition-colors duration-300 text-xl font-semibold text-center">
            <Link to="/delete">Delete Data</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
