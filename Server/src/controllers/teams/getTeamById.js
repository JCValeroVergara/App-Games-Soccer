const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTeamById = async (id) => {
  const team = await prisma.teams.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return team;
}


module.exports = getTeamById;
