import sensorManager from "./sensorManager.js";
import { handleSensorData } from "../sensors/logic.js";

export function startSimulator() {
  console.log("✅ Running in SIMULATOR mode (no external simulator file)");

  let lastCmd = "";

  sensorManager.sendCommand = (cmdObj) => {
    const s = JSON.stringify(cmdObj);
    if (s !== lastCmd) {
      console.log("SIM CMD ->", cmdObj);
      lastCmd = s;
    }
  };

  setInterval(() => {
    // Change these to test behaviors:
    // distance_cm: 10 will trigger STOP
    const fake = {
      distance_cm: 50,
      leftIR: 0,
      rightIR: 0,
    };

    sensorManager.update(fake);
    handleSensorData(fake);
  }, 200);
}
