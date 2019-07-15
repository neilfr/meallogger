const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

module.exports = {
  create: function(req, res) {
    sequelize
      .query("INSERT INTO favouritefood(userId,foodId) VALUES(?,?)", {
        replacements: [req.body.userId, req.body.foodId]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    sequelize
      .query(
        "DELETE FROM favouritefood " +
          "WHERE favouritefood.userId=? " +
          "AND favouritefood.foodId=?",
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
        "SELECT favouritefood.userID,favouritefood.foodID " +
          "FROM favouritefood ",
        {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    sequelize
      .query(
        "SELECT ff.foodId, fn.foodDescription, n.nutrientValue as calories " +
          "FROM favouritefood ff " +
          "INNER JOIN foodname fn " +
          "ON ff.foodId=fn.foodId " +
          "INNER JOIN nutrientamount n " +
          "ON fn.foodId=n.foodId " +
          "WHERE ff.userId = ? " +
          "AND n.nutrientId=208",
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: [req.params.userId]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
