const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getFieldById = async (id) => {
  const field = await prisma.fields.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return field;
}


module.exports = getFieldById;
