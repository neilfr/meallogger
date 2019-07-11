const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

module.exports = {
  findAll: function(req, res) {
    db.FoodName.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByFoodGroupId: function(req, res) {
    sequelize
      .query(
        // "SELECT foodname.FoodID, foodname.FoodCode, foodname.FoodGroupID, foodname.FoodDescription, favouritefoods.FoodID as Favourite " +
        "SELECT foodname.foodId, foodname.foodCode, foodname.foodGroupId, foodname.foodDescription, favouritefood.foodId as favourite " +
          "FROM foodname " +
          "LEFT JOIN favouritefood " +
          "ON foodname.foodId=favouritefood.foodId " +
          "WHERE foodname.foodGroupID=? " +
          "ORDER BY foodname.foodId ASC ",
        {
          replacements: [req.params.foodGroupId],
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
