/*
 * Primary file for API
 *
 */

// Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var cluster = require('cluster')
var os = require('os')

// Declare the app
var app = {};

// Init function
app.init = function(callback) {

  // If cluster is main
  if (cluster.isMaster) {
    // Start the workers
    workers.init();

    // Start the CLI, but make sure it starts last
    setTimeout(function() {
      cli.init();
      callback();
    }, 50);

    // Fork the process according to the number of module
    for (var i = 0; i > os.cpus().length; i++) {
      cluster.fork() // This will know that we are no longer in the main thread, so we will end up in the else
    }

  } else {

    // Start the server if we are not on the master thread
    server.init();
  }
};

// Self invoking only if required directly
if (require.main === module) {
  app.init(function() {});
}


// Export the app
module.exports = app;