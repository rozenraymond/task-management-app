import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks);
});

app.post('/task', async(req, res) => {
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

app.get('/task/:id', async(req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  res.json(task);
});

app.put('/task/:id', async(req, res) => {
  const { id } = req.params;
  const { name, description, dueDate } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      dueDate,
    },
  });

  res.json(task);
})



const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)