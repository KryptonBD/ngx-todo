import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { TodoStatus } from "../models/todo.model";

const todoRepository = AppDataSource.getRepository("Todo");

/**
 * @description Gets all todos
 * @route GET api/todos
 * @returns {data: Todo[], total: number} An array of todos and the total number of todos
 */
export const getTodos = async (req: Request, res: Response) => {
  const allTodos = await todoRepository.find();
  res.json({
    data: allTodos,
    total: allTodos.length,
  });
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

/**
 * @description Gets a todo by ID
 * @route GET api/todos/:id
 * @param {number} id - The ID of the todo
 * @returns {Todo} The todo with the specified ID
 */
export const getTodoById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const todo = await todoRepository.findOneBy({ id });

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(todo);
};

/**
 * @description Updates a todo status
 * @route PUT api/todos/:id
 * @param {number} id - The ID of the todo
 * @param {TodoStatus} status - The new status of the todo
 * @returns {Todo} The updated todo
 */
export const updateTodoStatus = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const status = req.body.status;

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  if (!status || !Object.values(TodoStatus).includes(status)) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  const todo = await todoRepository.findOneBy({ id });

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todo.status = req.body.status;
  await todoRepository.save(todo);
  res.json(todo);
};

/**
 * @description Updates a todo
 * @route PUT api/todos/:id
 * @param {number} id - The ID of the todo
 * @param {string} [title] - The new title of the todo
 * @param {string} [description] - The new description of the todo
 * @param {TodoStatus} [status] - The new status of the todo
 * @returns {Todo} The updated todo
 */
export const updateTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = await todoRepository.findOneBy({ id });

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todo.title = req.body.title || todo.title;
  todo.description = req.body.description || todo.description;
  todo.status = req.body.status || todo.status;
  await todoRepository.save(todo);
  res.json(todo);
};

/**
 * @description Deletes a todo
 * @route DELETE api/todos/:id
 * @param {number} id - The ID of the todo
 * @returns {object} A message indicating that the todo was deleted
 */
export const deleteTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = await todoRepository.findOneBy({ id });

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  await todoRepository.delete(todo.id);
  res.json({ message: "Todo deleted" });
};
