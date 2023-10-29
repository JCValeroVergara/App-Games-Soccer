const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFields = async () => {
  const fields = await prisma.fields.findMany();
  return fields;
}


module.exports = getAllFields;
