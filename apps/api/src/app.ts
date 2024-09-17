import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { taskFormSchema } from "@task-management-platform/validation";
import { validateRequestBody } from "./middleware/validator";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  const {
    skip = "0",
    take = "10",
    searchTerm = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const parsedSkip = Math.max(0, parseInt(skip as string, 10));
  // Limit the number of items per page to 100
  const parsedTake = Math.min(100, Math.max(0, parseInt(take as string, 10)));

  const where: Prisma.TaskWhereInput = searchTerm
    ? {
        OR: [{ name: { contains: searchTerm as string, mode: "insensitive" } }],
      }
    : {};

  const [tasks, totalCount] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: parsedSkip,
      take: parsedTake,
      orderBy: {
        [sortBy as string]: sortOrder,
      },
    }),
    prisma.task.count({ where }),
  ]);
  res.json({ tasks, totalCount });
});

app.post("/task", validateRequestBody(taskFormSchema), async (req, res) => {
  const { name, description, dueDate } = req.body;
  const task = await prisma.task.create({
    data: {
      name,
      description,
      dueDate,
    },
  });

  res.json(task);
});

app.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(task);
});

app.put("/task/:id", validateRequestBody(taskFormSchema), async (req, res) => {
  const { id } = req.params;

  console.log("id", id);

  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { name, description, dueDate } = req.body;

  const task = await prisma.task.update({
    where: { id },
    data: {
      name,
      description,
      dueDate,
    },
  });

  res.json(task);
});

app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  const task = await prisma.task.delete({
    where: { id },
  });

  res.json({ id: task.id });
});

export default app;
