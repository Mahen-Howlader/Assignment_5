import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(" MongoDB Connected...");

    server = app.listen(Number(process.env.PORT) || 5000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.log(" Failed to connect MongoDB:", error);
  }
};

startServer();
