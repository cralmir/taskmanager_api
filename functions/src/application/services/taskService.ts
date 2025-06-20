import {db} from "../../config/firebase";
import {TaskInput} from "../../schemas/taskSchema";
import {Task} from "../../types/task";

export const createTaskByUser = async (
  userId: string,
  input: TaskInput
): Promise<Task> => {
  const newTaksRef = db.collection("taskTest").doc();

  const task: Task = {
    id: newTaksRef.id,
    title: input.title,
    description: input.description || "",
    created_at: new Date().toISOString(),
    completed: input.completed ?? false,
    userId,
  };

  await newTaksRef.set(task);

  return task;
};

export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
  const snapshot = await db
    .collection("taskTest")
    .where("userId", "==", userId)
    .orderBy("created_at", "desc")
    .get();

  const tasks: Task[] = [];

  snapshot.forEach((doc) => {
    tasks.push(doc.data() as Task);
  });

  return tasks;
};

export const updateTasksByTaskId = async (
  userId: string,
  taskId: string,
  updates: Partial<Omit<Task, "id" | "userId" | "created_at">>
): Promise<Task | null> => {
  const taskRef = db.collection("taskTest").doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) return null;

  const taskData = taskDoc.data() as Task;

  if (taskData.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await taskRef.update(updates);
  const updatedDoc = await taskRef.get();

  return updatedDoc.data() as Task;
};

export const deleteTaskByTaskId = async (
  userId: string,
  taskId: string
): Promise<boolean> => {
  const taskRef = db.collection("taskTest").doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) return false;

  const taskData = taskDoc.data() as Task;

  if (taskData.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await taskRef.delete();

  return true;
};
