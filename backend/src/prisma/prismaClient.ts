import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

process.on('beforeExit', async () => {
  console.log("Prisma client disconnecting");
});

export default prisma;
