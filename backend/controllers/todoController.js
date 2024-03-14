import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// fetch all todos
const getTodos = asyncHandler(async (req, res) => {
  const allToDos = await Todo.find({});
  res.json(allToDos);
});

// fetch todos of logedin user
const getTodoByUserId = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.params.id });
  if (todo) {
    res.json(todo);
    console.log(todo);
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  console.log("Updating todo with ID:", req.params.todoId);
  const todo = await Todo.findById(req.params.todoId);
  console.log("Found todo:", todo);

  if (todo) {
    todo.user = todo.user;
    todo.name = req.body.updatedTodo;
    todo.status = todo.status;
    const latestTodo = await todo.save();
    console.log("Updated todo:", latestTodo);
    res.json(latestTodo);
  } else {
    console.log("Todo not found");
    res.status(404).json({ message: "Todo not found" });
  }
});

const createTodo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body; // Correctly extract 'text' from request body

  try {
    // Create todo using userId and text
    const todo = await Todo.create({ user: userId, name }); // Pass 'userId' and 'text' to create method
    // Send response with created todo
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// delete todo from
const deleteTodo = asyncHandler(async (req, res) => {
  await Todo.deleteOne({ _id: req.params.todoId });
});

// update todo status
const updateTodoStatus = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  if (todo) {
    todo.user = todo.user;
    todo.name = todo.name;
    todo.status = req.params.status;
    await todo.save();
  } else {
    res.status(404);
    throw new Error("Unable to update status of todo");
  }
});

export {
  getTodos,
  getTodoByUserId,
  updateTodo,
  createTodo,
  deleteTodo,
  updateTodoStatus,
};
