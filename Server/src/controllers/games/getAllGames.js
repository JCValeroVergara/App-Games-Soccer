const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllGames = async () => {
  const games = await prisma.games.findMany({
    include: {
      teamHome: true,
      teamAway: true,
      field: true,
    },
  });
  return games;
}


module.exports = getAllGames;
