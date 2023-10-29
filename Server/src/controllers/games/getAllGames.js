const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllGames = async () => {
  const games = await prisma.games.findMany();
  return games;
}


module.exports = getAllGames;
