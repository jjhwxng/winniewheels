import express from "express";
import robotRoutes from "./motors/robotRoutes.js";

const app = express();
app.use(express.json());

// Everything inside robotRoutes becomes /api/...
app.use("/api", robotRoutes);

export default app;
