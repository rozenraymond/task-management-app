import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createFakeTask(): Prisma.TaskCreateInput {
  return {
    name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
    description: faker.lorem.sentences(3),
    dueDate: faker.date.soon({ days: Math.ceil(Math.random() * 30) }),
    createdAt: faker.date.recent({ days: Math.ceil(Math.random() * 14) }),
  };
}

const taskData: Prisma.TaskCreateInput[] = Array.from(
  { length: 200 },
  createFakeTask,
);

async function main() {
  const tasks = await prisma.task.findMany();

  if (tasks.length > 0) {
    console.log(`Clearing seed data...`);

    await prisma.task.deleteMany();
  }

  console.log(`Start seeding ...`);
  for (const u of taskData) {
    const task = await prisma.task.create({
      data: u,
    });
    console.log(`Created task with id: ${task.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
