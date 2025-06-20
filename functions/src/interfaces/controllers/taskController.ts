import {Response} from "express";

import {AuthRequest} from "../../types/authRequest";
import {
  createTaskByUser,
  getTasksByUserId,
  updateTasksByTaskId,
  deleteTaskByTaskId,
} from "../../application/services/taskService";
import {taskSchema, updateTaskSchema} from "../../schemas/taskSchema";
import {ZodError} from "zod";

export const getTasksByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || "";

    const tasks = await getTasksByUserId(userId);

    res.status(200).json({tasks});
    return;
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const addTasksByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || "";

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const input = taskSchema.parse(req.body);
    const task = await createTaskByUser(userId, input);

    res.status(200).json({task});
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({errors: error.errors});
      return;
    }
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || "";
    const taskId = req.params.id;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const input = updateTaskSchema.parse(req.body);
    const updatedTask = await updateTasksByTaskId(userId, taskId, input);

    if (!updatedTask) {
      res.status(404).json({message: "Task not found"});
      return;
    }

    res.status(200).json({updatedTask});
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({errors: error.errors});
      return;
    }
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || "";
    const taskId = req.params.id;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const deleteTask = await deleteTaskByTaskId(userId, taskId);

    if (!deleteTask) {
      res.status(404).json({message: "Task not found"});
      return;
    }

    res.status(200).json({message: "Task Deleted"});
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({errors: error.errors});
      return;
    }
    res.status(500).json({message: "Internal server error"});
    return;
  }
};
