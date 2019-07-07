const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

module.exports = {
  create: function(req, res) {
    sequelize
      .query("INSERT INTO favouritefood VALUES(?,?)", {
        replacements: [req.body.userId, req.body.foodId]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    sequelize
      .query(
        "DELETE FROM favouritefood " +
          "WHERE favouritefood.UserId=? " +
          "AND favouritefood.FoodId=?",
        {
          replacements: [req.body.userId, req.body.foodId]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    sequelize
      .query(
        "SELECT favouritefood.UserID,favouritefood.FoodID " +
          "FROM favouritefood ",
        {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
