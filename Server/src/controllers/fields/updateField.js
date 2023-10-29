const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateField = async (id,data) => {
  const field = await prisma.fields.update({
    where: {
      id: parseInt(id),
    },
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

module.exports = updateField;
