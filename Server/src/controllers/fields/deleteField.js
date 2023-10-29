const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const deleteField = async (id) => {
  const field = await prisma.fields.delete({
    where: {id: parseInt(id)}
  });
  return field;
}


module.exports = deleteField;
