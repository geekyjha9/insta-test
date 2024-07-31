const request = require('supertest');
const User = require('../models/User');
const Post = require('../models/Post');
const { app } = require('../app');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use a default for testing
require('./helpers/dbSetup'); // Import centralized setup

describe('Profile Controller', () => {
    let token;
    let user;
    let posts;
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Set timeout to 10 seconds globally
      });
    beforeAll(async () => {
        // Create a test user and generate a token
        user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            fullname: 'John Doe'
        });

        token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Create test posts
        posts = await Post.bulkCreate([
            {
                caption: 'First post',
                image: 'image1.jpg',
                hashtag: 'first',
                userId: user.id
            },
            {
                caption: 'Second post',
                image: 'image2.jpg',
                hashtag: 'second',
                userId: user.id
            }
        ]);
    });

    afterAll(async () => {
        await User.destroy({ truncate: true, cascade: true });
        await Post.destroy({ truncate: true, cascade: true });
    });

    describe('GET /api/user/profile', () => {
        it('[REQ013]_fetch_logged_in_user_profile_successfully', async () => {
            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy(); // Ensure the success field is true
            expect(response.body.user).toBeTruthy(); // Ensure user data is present
            expect(response.body.user.id).toBe(user.id);
            expect(response.body.user.fullname).toBe(user.fullname);
            expect(response.body.user.username).toBe(user.username);
            expect(response.body.images).toBeTruthy(); // Ensure images array is present
            expect(response.body.images.length).toBe(posts.length); // Ensure correct number of images
        });

        it('[REQ014]_fail_to_fetch_profile_without_token', async () => {
            const response = await request(app).get('/api/user/profile');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Authentication required');
        });

        it('[REQ015]_return_empty_images_if_user_has_no_posts', async () => {
            // Create a new user with no posts
            const newUser = await User.create({
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'newpassword123',
                fullname: 'Jane Doe'
            });

            const newToken = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${newToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy(); // Ensure the success field is true
            expect(response.body.user).toBeTruthy(); // Ensure user data is present
            expect(response.body.user.id).toBe(newUser.id);
            expect(response.body.user.fullname).toBe(newUser.fullname);
            expect(response.body.user.username).toBe(newUser.username);
            expect(response.body.images).toBeTruthy(); // Ensure images array is present
            expect(response.body.images.length).toBe(0); // Expecting an empty images array
        });

        it('[REQ016]_handle_internal_server_error', async () => {
            // Temporarily modify the findAll method to throw an error
            spyOn(Post, 'findAll').and.throwError('Internal Server Error');

            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(500);
            expect(response.body.success).toBeFalsy(); // Ensure success field is false
            expect(response.body.message).toBe('Internal server error. ');
        });
    });
});
