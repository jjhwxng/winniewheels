import React, { useState, useEffect } from "react";
import "./GPS.css";

const GPS = () => {
  // Dummy GPS data for now
  const [gpsOn, setGpsOn] = useState(false);
  const [coords, setCoords] = useState({
    lat: "0.0000",
    lon: "0.0000",
    satellites: 0,
    accuracy: "N/A"
  });

  // Simulate incoming GPS data when gpsOn = true
  useEffect(() => {
    let interval;
    if (gpsOn) {
      interval = setInterval(() => {
        // generate fake GPS data
        setCoords({
          lat: (40 + Math.random() * 0.01).toFixed(6),
          lon: (-88 + Math.random() * 0.01).toFixed(6),
          satellites: Math.floor(Math.random() * 10) + 3,
          accuracy: (Math.random() * 5 + 1).toFixed(2) + " m"
        });
      }, 1500);
    } else {
      // reset data when gps turns off
      setCoords({
        lat: "0.0000",
        lon: "0.0000",
        satellites: 0,
        accuracy: "N/A"
      });
    }
    return () => clearInterval(interval);
  }, [gpsOn]);

  const toggleGPS = () => {
    setGpsOn(!gpsOn);
  };

  return (
    <div className="gps-container">
      <h1>GPS Module</h1>

      <div className="gps-box">
        {gpsOn ? (
          <div className="gps-data">
            <p><strong>Latitude:</strong> {coords.lat}</p>
            <p><strong>Longitude:</strong> {coords.lon}</p>
            <p><strong>Satellites:</strong> {coords.satellites}</p>
            <p><strong>Accuracy:</strong> {coords.accuracy}</p>
          </div>
        ) : (
          <div className="gps-off">GPS Module Offline</div>
        )}
      </div>

      <button className="gps-toggle-btn" onClick={toggleGPS}>
        {gpsOn ? "Turn GPS Off" : "Turn GPS On"}
      </button>
    </div>
  );
};

export default GPS;
