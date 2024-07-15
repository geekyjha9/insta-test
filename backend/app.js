const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Import the body-parser middleware
const sequelize = require('./config/db'); // Import the Sequelize instance
const User = require('./models/User'); // Import the User model
const userRoutes = require('./routes/userRoutes'); // Import the user routes

const app = express(); // Create an Express application

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads

// Define associations between models, if any
// Example: If there are relationships between models, they can be defined here
// User.hasMany(AnotherModel);

// Routes
app.use('/api/users', userRoutes); // Use the user routes for any requests to /api/users

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  console.log('Database & tables synced'); // Log a message if syncing is successful
}).catch(err => {
  console.error('Error syncing database:', err); // Log an error message if syncing fails
});

// Start the server
const PORT = process.env.PORT || 5000; // Define the port number, default to 5000 if not set in environment variables
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message when the server starts successfully
});

module.exports = { app, server }; // Export the app and server objects for use in testing or other parts of the application
