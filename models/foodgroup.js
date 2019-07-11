const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const Model = Sequelize.Model;
class FoodGroup extends Model {}
FoodGroup.init(
  {
    foodGroupId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    foodGroupCode: Sequelize.INTEGER,
    foodGroupName: Sequelize.STRING
  },
  {
    sequelize,
    modelName: "foodgroup"
  }
);

// alternative syntax

// const FoodGroup = sequelize.define("foodgroup", {
//   foodGroupId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   foodGroupCode: Sequelize.INTEGER,
//   foodGroupName: Sequelize.STRING
// });

module.exports = FoodGroup;
