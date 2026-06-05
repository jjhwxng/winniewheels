import React, { useState } from "react";
import "./Camera.css";

const Camera = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const cameraUrl = "http://10.193.10.174:8000/stream.mjpg";

  const toggleCamera = () => setCameraOn((prev) => !prev);

  return (
    <div className="camera-container">
      <h1>Camera Module</h1>

      <div className="camera-feed">
        {cameraOn ? (
          <img className="camera-stream" src={cameraUrl} alt="Live Stream" />
        ) : (
          <div className="camera off">Camera is Off</div>
        )}
      </div>

      <button className="toggle-button" onClick={toggleCamera}>
        {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
      </button>
    </div>
  );
};

export default Camera;