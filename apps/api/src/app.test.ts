import { PrismaClient } from '@prisma/client';
import request from 'supertest';

import app from './app';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe('task management api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tasks', () => {
    it('should return a list of tasks with total count', async () => {
      const mockTasks = [
        { id: '1', name: 'Task 1', description: 'First task', dueDate: null },
      ];

      prisma.task.findMany = jest.fn().mockResolvedValue(mockTasks);
      prisma.task.count = jest.fn().mockResolvedValue(1);

      const res = await request(app).get('/tasks').query({ skip: 0, take: 10 });

      expect(res.status).toBe(200);
      expect(res.body.tasks).toEqual(mockTasks);
      expect(res.body.totalCount).toBe(1);
    });
  });

  describe('POST /task', () => {
    it('should create a new task', async () => {
      const mockTask = {
        id: '1',
        name: 'Task 1',
        description: 'First task',
        dueDate: new Date().toISOString(),
      };

      prisma.task.create = jest.fn().mockResolvedValue(mockTask);

      const res = await request(app).post('/task').send({
        name: mockTask.name,
        description: mockTask.description,
        dueDate: mockTask.dueDate,
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTask);
    });

    it('should return 400 if validation fails', async () => {
      const res = await request(app).post('/task').send({ name: '' });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /task/:id', () => {
    it('should return a task by id', async () => {
      const mockTask = { id: '1', name: 'Task 1', description: 'First task' };

      prisma.task.findUnique = jest.fn().mockResolvedValue(mockTask);

      const res = await request(app).get('/task/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTask);
    });

    it('should return 404 if task not found', async () => {
      prisma.task.findUnique = jest.fn().mockResolvedValue(null);

      const res = await request(app).get('/task/999');

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /task/:id', () => {
    it('should update the task if it exists', async () => {
      const mockExistingTask = {
        id: '1',
        name: 'Existing Task',
        description: 'Existing task description',
        dueDate: new Date().toISOString(),
      };

      const mockUpdatedTask = {
        id: '1',
        name: 'Updated Task',
        description: 'Updated description',
        dueDate: new Date().toISOString(),
      };

      prisma.task.findUnique = jest.fn().mockResolvedValue(mockExistingTask);
      prisma.task.update = jest.fn().mockResolvedValue(mockUpdatedTask);

      const res = await request(app).put('/task/1').send(mockUpdatedTask);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUpdatedTask);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          name: mockUpdatedTask.name,
          description: mockUpdatedTask.description,
          dueDate: mockUpdatedTask.dueDate,
        },
      });
    });

    it('should return 404 if task not found', async () => {
      prisma.task.findUnique = jest.fn().mockResolvedValue(null);

      const res = await request(app).put('/task/999').send({
        id: '999',
        name: 'Updated Task',
        description: 'Updated description',
        dueDate: new Date().toISOString(),
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'Task not found' });
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('DELETE /task/:id', () => {
    it('should delete the task if it exists', async () => {
      const mockExistingTask = {
        id: '1',
        name: 'Existing Task',
        description: 'Existing task description',
      };

      prisma.task.findUnique = jest.fn().mockResolvedValue(mockExistingTask);
      prisma.task.delete = jest.fn().mockResolvedValue(mockExistingTask);

      const res = await request(app).delete('/task/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1' });
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return 404 if task not found', async () => {
      prisma.task.findUnique = jest.fn().mockResolvedValue(null);

      const res = await request(app).delete('/task/999');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'Task not found' });
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(prisma.task.delete).not.toHaveBeenCalled();
    });
  });
});
