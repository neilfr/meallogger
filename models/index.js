// const Sequelize = require("sequelize");
// const sequelize = require("../config/connection.js");
const foodgroup = require("./foodgroup");
const foodname = require("./foodname");

module.exports = {
  FoodGroup: foodgroup,
  FoodName: foodname
};
