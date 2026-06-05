// src/arduinoService.js
import { SerialPort, ReadlineParser } from "serialport";
import config from "./motors/serialConfig.js";
import sensorManager from "./motors/sensorManager.js";
import { handleSensorData } from "./sensors/logic.js";

export function startArduino() {
  const port = new SerialPort(config);
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  // This is the "send motor command back to Arduino" bridge
  sensorManager.sendCommand = (cmd) => {
    port.write(JSON.stringify(cmd) + "\n");
  };

  parser.on("data", (line) => {
    try {
      const data = JSON.parse(String(line).trim());

      // 1) store latest sensor readings
      sensorManager.update(data);

      // 2) run your robot brain (this will call commands.js)
      handleSensorData(data);
    } catch {
      console.log("Bad JSON:", line);
    }
  });
}