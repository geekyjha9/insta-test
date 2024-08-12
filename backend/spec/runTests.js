// spec/runTests.js
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// Configure Jasmine to use the SpecReporter
jasmine.env.clearReporters();
jasmine.addReporter(new SpecReporter({
    spec: {
        displayPending: true,
    }
}));

// Import all test files
require('./userSpec.js'); // replace with your actual test file names
require('./loginUserSpec.js');
require('./createPostSpec.js');
require('./authorizeUserSpec.js');
require('./getAllPostSpec.js');
require("./getProfileSpec.js");
require("./likeUnlikeSpec.js");
require("./commentSpec.js");

// Run the tests
jasmine.execute();
