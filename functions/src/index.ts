import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import authRouter from "./interfaces/routes/authRoutes";
import taskRouter from "./interfaces/routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRouter);
app.use("/", taskRouter);

export const api = functions.https.onRequest(app);
