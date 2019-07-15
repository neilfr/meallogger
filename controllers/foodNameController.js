const db = require("../models");
const sequelize = require("../config/connection.js");

module.exports = {
  findAll: function(req, res) {
    db.FoodName.findAll(req.query)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  findByFoodGroupId: function(req, res) {
    sequelize
      .query(
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
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
};
