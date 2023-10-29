const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createPlayer = async (data) => {
  const player = await prisma.players.create({
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

module.exports = createPlayer;
