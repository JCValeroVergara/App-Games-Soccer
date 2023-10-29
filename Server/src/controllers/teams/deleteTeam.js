const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const deleteTeam = async (id) => {
  const team = await prisma.teams.delete({
    where: {id: parseInt(id)}
  });
  return team;
}


module.exports = deleteTeam;
