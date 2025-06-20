import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
