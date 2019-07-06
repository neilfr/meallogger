const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");
const foodgroup = require("./foodgroup");
const foodname = require("./foodname");
// foodname.hasOne(foodgroup);

module.exports = {
  // Book: require("./book"),
  // FoodGroup: require("./foodgroup")
  FoodGroup: foodgroup,
  FoodName: foodname
};
