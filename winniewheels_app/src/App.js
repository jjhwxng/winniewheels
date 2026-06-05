import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Camera from "./components/Camera";
import GPS from "./components/GPS";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/gps" element={<GPS />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
