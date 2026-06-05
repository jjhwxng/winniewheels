import express from "express";
import sensorManager from "./sensorManager.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true });
});

router.get("/sensors", (req, res) => {
  res.json(sensorManager.get());
});

router.post("/cmd", (req, res) => {
  const action = String(req.body?.action || "").toUpperCase();
  const speed = Number(req.body?.speed ?? 150);
  const angle = Number(req.body?.angle ?? 20);

  let cmdObj;

  switch (action) {
    case "MOVE_FORWARD":
      cmdObj = { cmd: "MOVE_FORWARD", speed };
      break;
    case "STOP":
      cmdObj = { cmd: "STOP" };
      break;
    case "TURN_LEFT":
      cmdObj = { cmd: "TURN_LEFT", angle };
      break;
    case "TURN_RIGHT":
      cmdObj = { cmd: "TURN_RIGHT", angle };
      break;
    default:
      return res.status(400).json({
        ok: false,
        error: "Unknown action",
        allowed: ["MOVE_FORWARD", "STOP", "TURN_LEFT", "TURN_RIGHT"],
      });
  }

  sensorManager.sendCommand(cmdObj);
  res.json({ ok: true, sent: cmdObj });
});

export default router;
