import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../backend/config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
  });
});
