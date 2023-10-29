const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createGame = async (data) => {
  const game = await prisma.games.create({
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

module.exports = createGame;
