const express = require("express");
const routes = require("./routes");
const app = express();

// use the environment variable for the port number if it exists; otherwise use 3001
const PORT = process.env.PORT || 3001;

// Define middleware here
// middleware to recognize incoming objects as strings or arrays
// "extended" means use qs library which allows creating nested objects with query strings.
app.use(express.urlencoded({ extended: true }));
// middleware to recognize incoming objects as json objects
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes
app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
