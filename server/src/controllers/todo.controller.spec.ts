import { Request, Response } from "express";
import { AppDataSource } from "../config/db";

import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
} from "./todo.controller";

export const todoListFactory = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Todo ${i + 1}`,
  description: `Description for Todo ${i + 1}`,
  status: "pending",
}));

describe("Todo Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let todoRepository = AppDataSource.getRepository("Todo");

  const mockTodo = {
    id: 1,
    title: "Todo 1",
    description: "Description for Todo 1",
    status: "pending",
  };

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockImplementation(() => {
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should return all todos", async () => {
    jest.spyOn(todoRepository, "find").mockResolvedValue(todoListFactory);

    await getTodos(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: todoListFactory,
      total: todoListFactory.length,
    });
  });

  it("should create a new todo", async () => {
    jest.spyOn(todoRepository, "create").mockReturnValue(mockTodo);
    jest.spyOn(todoRepository, "save").mockResolvedValue(mockTodo);

    mockRequest.body = mockTodo;

    await createTodo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
  });

  it("should return an error if title is missing", async () => {
    const newTodo = {
      description: "New Description",
      status: "pending",
    };

    mockRequest.body = newTodo;

    await createTodo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Title is required",
    });
  });

  it("should get todo by id", async () => {
    jest.spyOn(todoRepository, "findOneBy").mockResolvedValue(mockTodo);

    mockRequest.params = { id: "1" };

    await getTodoById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
  });

  it("should return an error if todo is not found", async () => {
    jest.spyOn(todoRepository, "findOneBy").mockResolvedValue(null);

    mockRequest.params = { id: "1" };

    await getTodoById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Todo not found",
    });
  });

  it("should delete a todo", async () => {
    jest.spyOn(todoRepository, "findOneBy").mockResolvedValue(mockTodo);
    jest.spyOn(todoRepository, "delete").mockResolvedValue({
      raw: [],
      affected: 1,
    });

    mockRequest.params = { id: "1" };

    await deleteTodo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Todo deleted",
    });
  });
});
