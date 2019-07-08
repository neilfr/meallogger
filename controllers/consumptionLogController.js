const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

module.exports = {
  create: function(req, res) {
    sequelize
      .query(
        "INSERT INTO consumptionLog(consumptionLogId,userId,foodId,quantity,logDate) " +
          " VALUES(NULL,?,?,?,NOW())",
        {
          replacements: [
            req.body.userId,
            req.body.foodId,
            req.body.quantity
            // TODO... incorporate req.body.logDate
          ]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    console.log("inside log controller delete with req.params:", req.params);
    sequelize
      .query(
        "DELETE FROM consumptionLog " +
          "WHERE consumptionLog.consumptionLogId=? ",
        {
          replacements: [req.params.consumptionLogId]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    sequelize
      .query(
        "SELECT c.consumptionLogId, c.userId, c.foodId, c.quantity, c.logDate, f.foodDescription " +
          "FROM consumptionlog c " +
          "INNER JOIN foodname f " +
          "ON c.foodId=f.foodId " +
          "WHERE userID=?",
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: [req.params.userId]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    sequelize
      .query(
        "SELECT consumptionLogId, userId, foodId, quantity, logDate " +
          "FROM consumptionlog ",
        {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // ,
  // create: function(req, res) {
  //   sequelize
  //     .query("INSERT INTO favouritefood VALUES(?,?)", {
  //       replacements: [req.body.userId, req.body.foodId]
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // delete: function(req, res) {
  //   sequelize
  //     .query(
  //       "DELETE FROM favouritefood " +
  //         "WHERE favouritefood.userId=? " +
  //         "AND favouritefood.foodId=?",
  //       {
  //         replacements: [req.body.userId, req.body.foodId]
  //       }
  //     )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
