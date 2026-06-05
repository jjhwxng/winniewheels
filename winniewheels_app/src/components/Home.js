import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>WinnieWheels</h1>
      <p>
        Check out <span>WECE's</span> smart delivery robot! 
        Navigate routes, detect obstacles, and connect through a live app.
      </p>

      <div className="cards">
        <div className="card">
          <h2>Autonomous Navigation</h2>
          <p>Sensors and GPS enable smart pathfinding</p>
        </div>
        <div className="card">
          <h2>Live Camera Feed</h2>
          <p>Camera streams live footage for safety and tracking</p>
        </div>
        <div className="card">
          <h2>GPS Tracking</h2>
          <p>Track your delivery robot in real time via mobile app</p>
        </div>
      </div>
    </div>
  );
}

export default Home;