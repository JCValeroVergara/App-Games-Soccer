const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTeam = async (data) => {
  const team = await prisma.teams.create({
    data: {
      name: data.name,
      city: data.city,
      neighborhood: data.neighborhood,
      manager: data.manager,
      managerPhone: data.managerPhone,
      image: data.image,
      players: data.players,
      homeGames: data.homeGames,
      awayGames: data.awayGames,
    },
  });
  return team;
}

module.exports = createTeam;
