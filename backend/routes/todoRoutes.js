import express from "express";
import {
  getTodoByUserId,
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
  updateTodoStatus,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getTodos);
router.route("/:id").get(getTodoByUserId);
router.route("/edit/:todoId").put(updateTodo);
// router.route("/:userId/:todoText").get(createTodo);
// Create a new todo
router.route("/:userId").post(createTodo);
router.route("/delete/:todoId").delete(deleteTodo);
router.route("/status/:todoId/:status").get(updateTodoStatus);

export default router;
