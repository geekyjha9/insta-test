const request = require('supertest');
const sequelize = require('../config/db');
const { app, server } = require('../app');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

describe('Post API', () => {
    let user;
    let token;

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Ensure clean database
        user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            fullname: 'Test User'
        });
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await sequelize.close();
        server.close();
    });

    beforeEach(async () => {
        await Post.destroy({ truncate: true, cascade: true });
    });

    describe('POST /api/posts/create', () => {
        it('[REQ023]_create_new_post_successfully', async () => {
            const response = await request(app)
                .post('/api/posts/create')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    caption: 'Test Caption',
                    image: 'test-image.jpg',
                    hashtag: '#test'
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                id: jasmine.any(Number),
                caption: 'Test Caption',
                image: 'test-image.jpg',
                hashtag: '#test',
                userId: user.id,
                createdAt: jasmine.any(String),
                updatedAt: jasmine.any(String)
            });
        });

        it('[REQ024]_not_create_post_with_missing_required_fields', async () => {
            const response = await request(app)
                .post('/api/posts/create')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    image: 'test-image.jpg'
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                {
                    "type": "field",
                    "msg": "Caption is required",
                    "path": "caption",
                    "location": "body"
                }
            ]);
        });

        it('[REQ025]_not_create_post_with_invalid_token', async () => {
            const response = await request(app)
                .post('/api/posts/create')
                .set('Authorization', 'Bearer invalid_token')
                .send({
                    caption: 'Test Caption',
                    image: 'test-image.jpg',
                    hashtag: '#test'
                });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                success: false,
                message: 'Invalid credentials'
            });
        });
    });
});
