// src/sensors/commands.js
import sensorManager from "../motors/sensorManager.js";

export function cmdMoveForward(speed = 150) {
  sensorManager.sendCommand({ cmd: "MOVE_FORWARD", speed });
}

export function cmdStop() {
  sensorManager.sendCommand({ cmd: "STOP" });
}

export function cmdTurnLeft(angle = 20) {
  sensorManager.sendCommand({ cmd: "TURN_LEFT", angle });
}

export function cmdTurnRight(angle = 20) {
  sensorManager.sendCommand({ cmd: "TURN_RIGHT", angle });
}
