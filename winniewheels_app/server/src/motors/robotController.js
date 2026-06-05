import { move } from "../services/motorController.js";
import sensorManager from "../services/sensorManager.js";

export function moveCommand(req, res) {
  const { speed, direction } = req.body;
  move(speed, direction);
  res.json({ status: "OK", speed, direction });
}

export function getSensors(req, res) {
  res.json(sensorManager.get());
}