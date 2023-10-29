const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPlayers = async () => {
  const players = await prisma.players.findMany();
  return players;
}


module.exports = getAllPlayers;
