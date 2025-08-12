import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load env variables early

import leadsroute from "./routes/routes.js";
import { connectDB } from "./lib/db.js";

import cors from "cors";




const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', leadsroute);

// Connect DB and start server
connectDB().then(() => {
  app.listen( 5000, () => {
    console.log(`✅ Server running on port  ssss ${5000}`);
  });
});
