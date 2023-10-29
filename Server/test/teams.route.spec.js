const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Teams route', () => {
  let teamId;
  let response;

  describe('GET /api/teams', () => {
    beforeAll(async () => {
      response = await request(app).get('/api/teams').send();
    });
    it('should return all teams', async () => {
      const allTeams = await prisma.teams.findMany();
      expect(allTeams).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/teams', () => {
    beforeAll(async () => {
      response = await request(app).post('/api/teams').send({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        manager: 'Test',
        managerPhone: '555-555-5555',
      });
    });
    it('should create a new team', async () => {
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        manager: 'Test',
        managerPhone: '555-555-5555',
      });
      expect(response.body).toHaveProperty('id');
      teamId = response.body.id;
    });
  });

  describe('GET /api/teams/:id', () => {
    beforeAll(async () => {
      response = await request(app).get(`/api/teams/${teamId}`).send();
    });
    it('should return a team', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        manager: 'Test',
        managerPhone: '555-555-5555',
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/teams/:id', () => {
    beforeAll(async () => {
      response = await request(app).put(`/api/teams/${teamId}`).send({
        name: 'TestUpdate',
        city: 'Test',
        neighborhood: 'Test',
        manager: 'TestUpdate',
        managerPhone: '555-555-5566',
      });
    });
    it('should update a team', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'TestUpdate',
        city: 'Test',
        neighborhood: 'Test',
        manager: 'TestUpdate',
        managerPhone: '555-555-5566',
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(teamId);
      expect(response.body.name).toBe('TestUpdate');
    });
  });

  describe('DELETE /api/teams/:id', () => {
    beforeAll(async () => {
      response = await request(app).delete(`/api/teams/${teamId}`);
    });
    it('should delete a team', async () => {
      expect(response.status).toBe(200);
    });
    it('should return a 404 if team not found', async () => {
      response = await request(app).delete(`/api/teams/${teamId}`);
      expect(response.status).toBe(404);
    });
  });
});
