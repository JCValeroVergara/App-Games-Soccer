const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const deleteGame = async (id) => {
  const game = await prisma.games.delete({
    where: {id: parseInt(id)}
  });
  return game;
}


module.exports = deleteGame;
