import express from "express";
import dotenv from "dotenv";
dotenv.config();

import leadsroute from "./routes/routes.js";
import { connectDB } from "./lib/db.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", leadsroute);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log(`✅ Server running on port  ssss ${5000}`);
  });
});
