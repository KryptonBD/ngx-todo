import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";
import todos from "./routes/todos";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

      app.use("/api/todos", todos);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
