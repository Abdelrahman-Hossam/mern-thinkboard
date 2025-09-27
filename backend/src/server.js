import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // middleware gives us access to req.body in notesContoller (It will parse JSON bodies )
app.use(cors({ origin: "http://localhost:5173" }));

// app.use(rateLimiter); 

app.use((req, res, next) => {
  // middleware to print the method and URL
  console.log(`req method is ${req.method}, req URL is ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
