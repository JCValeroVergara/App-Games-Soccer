const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updatePlayer = async (id, data) => {
  const player = await prisma.players.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      teamId: data.teamId,
    },
  });
  return player;
}

module.exports = updatePlayer;


