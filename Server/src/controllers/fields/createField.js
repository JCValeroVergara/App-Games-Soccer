const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createField = async (data) => {
  const field = await prisma.fields.create({
    data: {
      name: data.name,
      city: data.city,
      neighborhood: data.neighborhood,
      address: data.address,
      phone: data.phone,
      image: data.image,
    },
  });
  return field;
}

module.exports = createField;
