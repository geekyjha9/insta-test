// Import the Sequelize library, which is an ORM (Object-Relational Mapping) library for Node.js
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize({
  // Specify the dialect as 'sqlite' to indicate we are using SQLite database
  dialect: 'sqlite',

  // Define the storage path for the SQLite database file
  // The database file will be located at './data/test_db.sqlite'
  storage: './data/test_db.sqlite',

  // Disable logging to avoid cluttering the console with SQL statements
  // By default, Sequelize logs all SQL queries to the console
  logging: false
});

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
