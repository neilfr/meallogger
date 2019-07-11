const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");
const Moment = require("moment");

module.exports = {
  create: function(req, res) {
    sequelize
      .query(
        "INSERT INTO consumptionLog(consumptionLogId,userId,foodId,quantity,logDate) " +
          " VALUES(NULL,?,?,?,?)",
        {
          replacements: [
            req.body.userId,
            req.body.foodId,
            req.body.quantity,
            Moment(req.body.logDate).format("YYYY-MM-DD HH:mm:ss")
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
    // energy nutrient id = 208, symbol KCAL, in kCal
    // potassium nutrient id = 306, symbol K, in mg
    sequelize
      .query(
        "SELECT c.consumptionLogId, c.userId, c.foodId, c.quantity, c.logDate, f.foodCode, f.foodDescription, n.nutrientValue AS calories " +
          "FROM consumptionlog c " +
          "INNER JOIN foodname f " +
          "ON c.foodId=f.foodId " +
          "INNER JOIN nutrientamount n " +
          "ON c.foodId=n.foodId " +
          "WHERE userID=? " +
          "AND n.nutrientID=208",
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
  },
  update: function(req, res) {
    console.log("update payload:", JSON.stringify(req.body));
    sequelize
      .query(
        "UPDATE consumptionlog " +
          "SET foodId=?, quantity=?, logDate=? " +
          "WHERE consumptionLogId=?",
        {
          replacements: [
            req.body.foodId,
            req.body.quantity,
            moment(req.body.logDate).format("YYYY-MM-DD HH:mm:ss"),
            req.body.consumptionLogId
          ]
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
