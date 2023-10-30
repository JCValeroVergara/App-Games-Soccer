const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPlayers = async () => {
  const players = await prisma.players.findMany({
    include: {
      team: true,
    },
  });
  return players;
}


module.exports = getAllPlayers;
