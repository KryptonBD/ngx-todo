import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";
import todos from "./routes/todos.route";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    app.use("/api/todos", todos);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
