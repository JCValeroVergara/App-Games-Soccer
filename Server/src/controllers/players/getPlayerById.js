const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPlayerById = async (id) => {
  const player = await prisma.players.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return player;
}

module.exports = getPlayerById;
