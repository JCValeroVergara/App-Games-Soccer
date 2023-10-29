const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deletePlayer = async (id) => {
  const player = await prisma.players.delete({
    where: {id: parseInt(id)}
  });
  return player;
}


module.exports = deletePlayer;
