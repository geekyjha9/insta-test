const request = require('supertest');
const sequelize = require('../config/db');
const User = require('../models/User');
const { app, server } = require('../app');

describe('User API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure clean database
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });

  beforeEach(async () => {
    await User.destroy({ truncate: true, cascade: true }); // Clear all users before each test
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
          fullname: 'abhi ag'
        });

        expect(response.body).toEqual({
            user: jasmine.any(Object), // Use jasmine.any for object comparison
            message: 'Registered Successfully'
          });
          
    });

    it('should not register a user with an existing email', async () => {
      await User.create({
        username: 'anotheruser',
        email: 'testuser@example.com',
        password: 'password123',
        fullname: 'another ag'
      });

      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'newuser',
          email: 'testuser@example.com',
          password: 'password123',
          fullname: 'new ag'
        });

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'User already exists with that email'
      });
    });

    it('should not register a user with an existing username', async () => {
      await User.create({
        username: 'testuser',
        email: 'newuser@example.com',
        password: 'password123',
        fullname: 'new ag'
      });

      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'anotheruser@example.com',
          password: 'password123',
          fullname: 'another ag'
        });

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'User already exists with that username'
      });
    });
  });
});
