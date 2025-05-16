import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import router from "./routes/route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.use("/", router);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
