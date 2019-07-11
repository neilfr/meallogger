// not currently using model for favourites
// using sequelize.query with SQL directly in the controller

const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");
// const FoodGroup = require("./foodgroup");

const Model = Sequelize.Model;
class FoodName extends Model {}
FoodName.init(
  {
    foodId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    foodCode: Sequelize.INTEGER,
    foodGroupId: Sequelize.INTEGER,
    foodSourceId: Sequelize.INTEGER,
    foodDescription: Sequelize.STRING
  },
  {
    sequelize,
    modelName: "foodname"
  }
);

// FoodName.hasOne(FoodGroup);

module.exports = FoodName;
