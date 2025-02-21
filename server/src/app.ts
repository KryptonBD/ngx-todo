import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

      const todoRepository = AppDataSource.getRepository("Todo");

      app.get("/", async (req, res) => {
        const allTodos = await todoRepository.find();
        res.json(allTodos);
      });
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
