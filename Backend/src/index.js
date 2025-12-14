import express from "express";
import dotenv from "dotenv";
dotenv.config();

import leadsroute from "./routes/routes.js";
import { connectDB } from "./lib/db.js";

import cors from "cors";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// ✅ ping route FIRST
app.get("/api/ping", (req, res) => {
  res.status(200).send("pong");
   console.log(`✅ Server `);
});

app.use("/api", leadsroute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port  sssssss ${PORT}`);
  });
});


