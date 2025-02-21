import { Response, Router } from "express";
import { AppDataSource } from "../config/db";

const router = Router();

const todoRepository = AppDataSource.getRepository("Todo");

/**
 * @description Gets all todos
 * @route GET api/todos
 * @returns {Todo[]} An array of todos
 */
router.get("/", async (req, res) => {
  const allTodos = await todoRepository.find();
  res.json(allTodos);
});

/**
 * @description Creates a new todo
 * @route POST api/todos
 * @param {string} title - The title of the todo
 * @param {string} [description] - The description of the todo
 * @returns {Todo} The newly created todo
 */
router.post("/", async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const newTodo = await todoRepository.create(req.body);
  await todoRepository.save(newTodo);
  res.json(newTodo);
});

export default router;
