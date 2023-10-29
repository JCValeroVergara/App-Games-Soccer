const request = require('supertest')
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



describe('Players route', () => {
  let playerId;
  let response;

  describe('GET /api/players', () => {
    beforeAll(async () => {
      response = await request(app).get('/api/players').send();
    });
    it('should return all players', async () => {
      const allPlayers = await prisma.players.findMany();
      expect(allPlayers).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/players', () => {
    beforeAll(async () => {
      response = await request(app).post('/api/players').send({
        name: 'Test',
        phone: '555-555-5555',
        position: 'Goalkeeper',
        teamId: 8,
      });
    });
    it('should create a new player', async () => {
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        phone: '555-555-5555',
        position: 'Goalkeeper',
        teamId: 8,
      });
      expect(response.body).toHaveProperty('id');
      playerId = response.body.id;
    });
  });

  describe('GET /api/players/:id', () => {
    beforeAll(async () => {
      response = await request(app).get(`/api/players/${playerId}`).send();
    });
    it('should return a player', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        phone: '555-555-5555',
        position: 'Goalkeeper',
        teamId: 8,
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/players/:id', () => {
    beforeAll(async () => {
      response = await request(app).put(`/api/players/${playerId}`).send({
        name: 'TestUpdate',
        phone: '555-555-5555',
        position: 'Goalkeeper',
        teamId: 8,
      });
    });
    it('should update a player', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'TestUpdate',
        phone: '555-555-5555',
        position: 'Goalkeeper',
        teamId: 8,
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(playerId);
      expect(response.body.name).toBe('TestUpdate');
    });
  });

  describe('DELETE /api/players/:id', () => {
    beforeAll(async () => {
      response = await request(app).delete(`/api/players/${playerId}`)
    });
    it('should delete a player', async () => {
      expect(response.status).toBe(200);
    });
    it('should return a 404 if the player does not exist', async () => {
      const response = await request(app).delete(`/api/players/${playerId}`)
      expect(response.status).toBe(404);
    });
  });
})

