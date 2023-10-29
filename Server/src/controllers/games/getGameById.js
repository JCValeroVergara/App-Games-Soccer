const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getGameById = async (id) => {
  const game = await prisma.games.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return game;
}


module.exports = getGameById;
