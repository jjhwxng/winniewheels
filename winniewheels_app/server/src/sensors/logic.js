import { cmdMoveForward, cmdStop, cmdTurnLeft, cmdTurnRight } from "./commands.js";

let lastAction = "";
let lastTime = 0;

function throttle(ms = 120) {
  const now = Date.now();
  if (now - lastTime < ms) return false;
  lastTime = now;
  return true;
}

export function handleSensorData(data) {
  if (!throttle(120)) return;

  const distance = Number(data?.distance_cm);
  const leftIR = Number(data?.leftIR) ? 1 : 0;
  const rightIR = Number(data?.rightIR) ? 1 : 0;

  // Collision avoidance
  if (!Number.isFinite(distance) || distance < 30) {
    if (lastAction !== "STOP") {
      cmdStop();
      lastAction = "STOP";
    }
    return;
  }

  // Line following
  if (leftIR === 0 && rightIR === 0) {
    if (lastAction !== "FWD") {
      cmdMoveForward(150);
      lastAction = "FWD";
    }
  } else if (leftIR === 1 && rightIR === 0) {
    if (lastAction !== "LEFT") {
      cmdTurnLeft(20);
      lastAction = "LEFT";
    }
  } else if (leftIR === 0 && rightIR === 1) {
    if (lastAction !== "RIGHT") {
      cmdTurnRight(20);
      lastAction = "RIGHT";
    }
  } else {
    if (lastAction !== "STOP_TAPE") {
      cmdStop();
      lastAction = "STOP_TAPE";
    }
  }
}
