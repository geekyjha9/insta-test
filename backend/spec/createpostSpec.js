const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { createPost } = require('../controllers/postController');
const { isLogin } = require('../middlewares/isLogin');

// Load environment variables from .env.test
dotenv.config();

// Get JWT_SECRET from environment variables or use a default value
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const app = express();
app.use(bodyParser.json());
app.post('/api/posts/createpost', isLogin, createPost);

describe('POST /api/posts/createpost', () => {
  let token;

  beforeAll(() => {
    // Create a valid JWT token for testing
    token = jwt.sign({ id: 1, username: 'testuser' }, JWT_SECRET, { expiresIn: '1h' });
  });

  it('[REQ001]_should_create_a_new_post_and_return_it', async () => {
    const response = await request(app)
      .post('/api/posts/createpost')
      .set('Authorization', `Bearer ${token}`)
      .send({
        caption: 'Test Caption',
        image: 'Test Image',
        hashtag: 'Test Hashtag',
      });

    expect(response.status).toBe(201);
    expect(response.body.caption).toBeTruthy();
    expect(response.body.image).toBeTruthy();
    expect(response.body.hashtag).toBeTruthy();
  });

  it('[REQ002]_should_return_401_if_no_token_is_provided', async () => {
    const response = await request(app)
      .post('/api/posts/createpost')
      .send({
        caption: 'Test Caption',
        image: 'Test Image',
        hashtag: 'Test Hashtag',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBeTruthy();
  });
});
