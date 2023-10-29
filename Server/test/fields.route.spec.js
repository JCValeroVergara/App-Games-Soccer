const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



describe('Fields route', () => {
  let fieldId;
  let response;

  describe('GET /api/fields', () => {
    beforeAll(async () => {
      response = await request(app).get('/api/fields').send();
    });
    it('should return all fields', async () => {
      const allFields = await prisma.fields.findMany();
      expect(allFields).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/fields', () => {
    beforeAll(async () => {
      response = await request(app).post('/api/fields').send({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        address: 'Test',
        phone: '555-555-5555',
      });
    });
    it('should create a new field', async () => {
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        address: 'Test',
        phone: '555-555-5555',
      });
      expect(response.body).toHaveProperty('id');
      fieldId = response.body.id;
    });
  });

  describe('GET /api/fields/:id', () => {
    beforeAll(async () => {
      response = await request(app).get(`/api/fields/${fieldId}`).send();
    });
    it('should return a field', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'Test',
        city: 'Test',
        neighborhood: 'Test',
        address: 'Test',
        phone: '555-555-5555',
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/fields/:id', () => {
    beforeAll(async () => {
      response = await request(app).put(`/api/fields/${fieldId}`).send({
        name: 'TestUpdate',
        city: 'Test',
        neighborhood: 'Test',
        address: 'Test',
        phone: '555-555-5566',
      });
    });
    it('should update a field', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'TestUpdate',
        city: 'Test',
        neighborhood: 'Test',
        address: 'Test',
        phone: '555-555-5566',
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(fieldId);
      expect(response.body.name).toBe('TestUpdate');
    });
  });

  describe('DELETE /api/fields/:id', () => {
    beforeAll(async () => {
      response = await request(app).delete(`/api/fields/${fieldId}`).send();
    });
    it('should delete a field', async () => {
      expect(response.status).toBe(200);
    });
    it('should return a 404 if the field does not exist', async () => {
      response = await request(app).delete(`/api/fields/${fieldId}`).send();
      expect(response.status).toBe(404);
    });
  });
});
