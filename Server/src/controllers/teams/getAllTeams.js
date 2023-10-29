const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTeams = async () => {
  const teams = await prisma.teams.findMany();
  return teams;
}


module.exports = getAllTeams;
