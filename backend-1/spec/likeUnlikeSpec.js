// spec/likeUnlikeSpec.js
const request = require('supertest');
const User = require('../models/User');
const Post = require('../models/Post');
const { app } = require('../app');
const jwt = require('jsonwebtoken');
require('./helpers/dbSetup'); // Import centralized setup

describe('Like/Unlike API', () => {
    let user;
    let token;
    let post;

    beforeAll(async () => {
        user = await User.create({
            username: 'testuser' + Date.now(),
            email: 'testuser' + Date.now() + '@example.com',
            password: 'password123',
            fullname: 'Test User'
        });
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_jwt_secret', { expiresIn: '1h' });
    });

    beforeEach(async () => {
        await Post.destroy({ truncate: true, cascade: true });

        post = await Post.create({
            caption: 'Test Caption',
            image: 'test-image.jpg',
            hashtag: '#test',
            userId: user.id
        });
    });

    describe('PUT /api/posts/likes', () => {
        it('[REQ026]_like_post_successfully', async () => {
            const response = await request(app)
                .put('/api/posts/likes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: post.id });

            expect(response.status).toBe(200);
            expect(response.body.likes).toContain(user.id);
        });

        it('[REQ027]_like_post_already_liked', async () => {
            await post.update({ likes: [user.id] });

            const response = await request(app)
                .put('/api/posts/likes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: post.id });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already liked this post');
        });

        it('[REQ028]_like_post_with_invalid_token', async () => {
            const response = await request(app)
                .put('/api/posts/likes')
                .set('Authorization', 'Bearer invalid_token')
                .send({ postId: post.id });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                success: false,
                message: 'Invalid credentials'
            });
        });

        it('[REQ029]_like_non_existent_post', async () => {
            const response = await request(app)
                .put('/api/posts/likes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: 99999 });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Post not found');
        });
    });

    describe('PUT /api/posts/unlikes', () => {
        it('[REQ030]_unlike_post_successfully', async () => {
            await post.update({ likes: [user.id] });

            const response = await request(app)
                .put('/api/posts/unlikes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: post.id });

            expect(response.status).toBe(200);
            expect(response.body.likes).not.toContain(user.id);
        });

        it('[REQ031]_unlike_post_not_liked_yet', async () => {
            const response = await request(app)
                .put('/api/posts/unlikes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: post.id });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User has not liked this post');
        });

        it('[REQ032]_unlike_post_with_invalid_token', async () => {
            const response = await request(app)
                .put('/api/posts/unlikes')
                .set('Authorization', 'Bearer invalid_token')
                .send({ postId: post.id });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                success: false,
                message: 'Invalid credentials'
            });
        });

        it('[REQ033]_unlike_non_existent_post', async () => {
            const response = await request(app)
                .put('/api/posts/unlikes')
                .set('Authorization', `Bearer ${token}`)
                .send({ postId: 99999 });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Post not found');
        });
    });
});
