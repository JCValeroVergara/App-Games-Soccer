const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Games route', () => {
  let gameId;
  let response;

  describe('GET /api/games', () => {
    beforeAll(async () => {
      response = await request(app).get('/api/games').send();
    });
    it('should return all games', async () => {
      const allGames = await prisma.games.findMany();
      expect(allGames).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/games', () => {
    beforeAll(async () => {
      response = await request(app).post('/api/games').send({
        date: '2023-11-15T10:00:00.000Z',
        schedule: '2023-11-15T10:00:00.000Z',
        teamHomeId: 8,
        teamAwayId: 9,
        fieldId: 1,
        status: 'scheduled',
      });
    });
    it('should create a new game', async () => {
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        date: '2023-11-15T10:00:00.000Z',
        schedule: '2023-11-15T10:00:00.000Z',
        teamHomeId: 8,
        teamAwayId: 9,
        fieldId: 1,
        status: 'scheduled',
      });
      expect(response.body).toHaveProperty('id');
      gameId = response.body.id;
    });
  });

  describe('GET /api/games/:id', () => {
    beforeAll(async () => {
      response = await request(app).get(`/api/games/${gameId}`).send();
    });
    it('should return a game', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        date: '2023-11-15T10:00:00.000Z',
        schedule: '2023-11-15T10:00:00.000Z',
        teamHomeId: 8,
        teamAwayId: 9,
        fieldId: 1,
        status: 'scheduled',
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/games/:id', () => {
    beforeAll(async () => {
      response = await request(app).put(`/api/games/${gameId}`).send({
        date: '2023-11-17T10:00:00.000Z',
        schedule: '2023-11-17T10:00:00.000Z',
        teamHomeId: 8,
        teamAwayId: 9,
        fieldId: 1,
        status: 'scheduled',
      });
    });
    it('should update a game', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        date: '2023-11-17T10:00:00.000Z',
        schedule: '2023-11-17T10:00:00.000Z',
        teamHomeId: 8,
        teamAwayId: 9,
        fieldId: 1,
        status: 'scheduled',
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(gameId);
      expect(response.body.date).toBe('2023-11-17T10:00:00.000Z');
    });
  });

  describe('DELETE /api/games/:id', () => {
    beforeAll(async () => {
      response = await request(app).delete(`/api/games/${gameId}`).send();
    });
    it('should delete a game', async () => {
      expect(response.status).toBe(200);
    });
    it('should not return a game', async () => {
      response = await request(app).get(`/api/games/${gameId}`).send();
      expect(response.status).toBe(404);
    });
  });
});
