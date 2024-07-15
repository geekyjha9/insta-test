// Import the Express framework
const express = require('express'); 

// Create a new router object using Express' Router function
const router = express.Router(); 

// Import the userController module, which contains the logic for handling user-related routes
const userController = require('../controllers/userController'); 

// Define a route for registering a new user
// When a POST request is made to /register, the registerUser function from userController is called
router.post('/register', userController.registerUser); 

// Export the router object so it can be used in other parts of the application
module.exports = router; 

/**
 * Detailed Explanation:
 *
 * const express = require('express');
 * - What: This imports the Express framework.
 * - Why: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's used to handle routing, requests, and responses.
 * - How: By requiring the 'express' module, we can utilize all the functionalities provided by Express in our application.
 *
 * const router = express.Router();
 * - What: This creates a new router object using Express' Router function.
 * - Why: Routers in Express provide a way to organize routes. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 * - How: By calling express.Router(), we instantiate a new Router object which we can use to define routes.
 *
 * const userController = require('../controllers/userController');
 * - What: This imports the userController module.
 * - Why: The userController contains the logic for handling user-related routes, such as user registration. By importing it, we can use its functions to handle specific routes.
 * - How: By using require('../controllers/userController'), we bring in the module located at '../controllers/userController' which exports functionalities related to user operations.
 *
 * router.post('/register', userController.registerUser);
 * - What: This defines a route for handling POST requests to /register.
 * - Why: When a user wants to register, they will send a POST request to the /register endpoint. This line tells the application to call the registerUser function from userController when this request is received.
 * - How: By using router.post, we specify that for POST requests to the /register endpoint, the registerUser function should be called to handle the request.
 *
 * module.exports = router;
 * - What: This exports the router object.
 * - Why: By exporting the router, we make it available to other parts of the application. This allows us to import and use these routes in our main application file or other parts of the application.
 * - How: By using module.exports = router, we export the defined router so it can be required and used in other files.
 */
