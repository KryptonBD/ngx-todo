import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.get("/:id", getTodoById);
router.put("/:id/status", updateTodoStatus);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
