const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

// const FoodGroup = sequelize.define("foodgroup", {
//   // attributes
//   foodGroupId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   foodGroupCode: Sequelize.INTEGER,
//   foodGroupName: Sequelize.STRING
// });
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

module.exports = FoodGroup;
