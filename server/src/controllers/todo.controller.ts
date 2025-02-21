import { Request, Response } from "express";
import { AppDataSource } from "../config/db";

const todoRepository = AppDataSource.getRepository("Todo");

/**
 * @description Gets all todos
 * @route GET api/todos
 * @returns {Todo[]} An array of todos
 */
export const getTodos = async (req: Request, res: Response) => {
  const allTodos = await todoRepository.find();
  res.json(allTodos);
};

/**
 * @description Creates a new todo
 * @route POST api/todos
 * @param {string} title - The title of the todo
 * @param {string} [description] - The description of the todo
 * @returns {Todo} The newly created todo
 */
export const createTodo = async (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const newTodo = await todoRepository.create(req.body);
  await todoRepository.save(newTodo);
  res.json(newTodo);
};
