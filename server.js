const express = require("express");

const routes = require("./routes");

// const Sequelize = require('sequelize');

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
// Add routes, both API and view
app.use(routes);
// Routes
// =============================================================
//require("./routes/api-routes.js")(app);
// var db = require("./models");

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection has been established successfully.");
//     // Start the API server
//     app.listen(PORT, function() {
//       console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//     });
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
