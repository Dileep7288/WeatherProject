import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Insert from "./components/Insert";
import Update from "./components/Update";
import Delete from "./components/Delete";
import Retrieve from "./components/Retrieve";
import Header from "./components/Header";
import Weather from "./components/Weather";
import AirQuality from "./components/AirQuality";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Home from "./components/Home";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleHomeClick = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 mt-3">
      <div className="font-extrabold ">
        <h1 className="border-2 border-solid border-black inline-block px-4 py-3 -mx-1 rounded-xl bg-stone-400 hover:bg-pale-green">
          WEATHER APP
        </h1>
      </div>
      <button
        onClick={handleHomeClick}
        className="font-extrabold text-lg border-2 border-solid border-black inline-block px-5 py-3 -mx-1 rounded-xl bg-stone-400 hover:bg-pale-green transition-colors duration-300"
      >
        Home
      </button>
      <div className="flex gap-2">
        {!isAuthenticated && (
          <Link
            to="/signup"
            className="font-extrabold text-lg border-2 border-solid border-black inline-block px-5 py-3 rounded-xl bg-stone-400 hover:bg-pale-green transition-colors duration-300"
          >
            Client Sign Up
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="font-extrabold text-lg border-2 border-solid border-black inline-block px-5 py-3 rounded-xl bg-stone-400 hover:bg-pale-green transition-colors duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="font-extrabold text-lg border-2 border-solid border-black inline-block px-5 py-3 rounded-xl bg-stone-400 hover:bg-pale-green transition-colors duration-300"
          >
            Client Login
          </Link>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen p-8 rounded-lg">
          <div
            className="container mx-auto h-screen p-8 rounded-lg shadow-lg bg-opacity-85"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Navigation />
            <main className="py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/insert"
                  element={<ProtectedRoute element={<Insert />} />}
                />
                <Route
                  path="/update"
                  element={<ProtectedRoute element={<Update />} />}
                />
                <Route
                  path="/delete"
                  element={<ProtectedRoute element={<Delete />} />}
                />
                <Route path="/retrieve" element={<Retrieve />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/air-quality" element={<AirQuality />} />
                <Route path="/temperature" element={<Temperature />} />
                <Route path="/humidity" element={<Humidity />} />
                <Route
                  path="/header"
                  element={<ProtectedRoute element={<Header />} />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
