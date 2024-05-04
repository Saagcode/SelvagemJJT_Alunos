import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./database/connect.js";
connectToDatabase();
import "./database/express.js";
