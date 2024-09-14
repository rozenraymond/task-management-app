import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const taskData: Prisma.TaskCreateInput[] = [
  {
    name: 'Call Alice',
    description: "To finalise document details",
    dueDate: new Date(),
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of taskData) {
    const task = await prisma.task.create({
      data: u,
    })
    console.log(`Created task with id: ${task.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })