import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  addTasksByUser,
  deleteTask,
  getTasksByUser,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.get("/task", authenticateToken, getTasksByUser);
router.post("/task", authenticateToken, addTasksByUser);
router.patch("/task/:id", authenticateToken, updateTask);
router.delete("/task/:id", authenticateToken, deleteTask);

export default router;
