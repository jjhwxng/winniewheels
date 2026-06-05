// src/server.js
import "dotenv/config";
import app from "./app.js";
import { startArduino } from "./arduinoService.js";
import { startSimulator } from "./motors/simulatorService.js";

const PORT = process.env.PORT || 3000;
const MODE = (process.env.MODE || "SIM").toUpperCase(); // SIM or REAL

if (MODE === "REAL") startArduino();
else startSimulator();

app.listen(PORT, () => console.log(`Server running on port ${PORT} (${MODE})`));