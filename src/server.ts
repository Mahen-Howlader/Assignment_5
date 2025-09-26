import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import config from "./config";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${config.mongo_url}`);
    console.log(" MongoDB Connected...");

    server = app.listen(Number(config.port) || 5000, () => {
      console.log(`Server is listening on port ${config.port || 5000}`);
    });
  } catch (error) {
    console.log(" Failed to connect MongoDB:", error);
  }
};

startServer();
