const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const updateGame = async (id,data) => {
  const game = await prisma.games.update({
    where: {
      id: parseInt(id),
    },
    data: {
      date: data.date,
      schedule: data.schedule,
      teamHomeId: data.teamHomeId,
      teamAwayId: data.teamAwayId,
      fieldId: data.fieldId,
      status: data.status,
    },
  });
  return game;
}

module.exports = updateGame;
