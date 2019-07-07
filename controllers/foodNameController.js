const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

/*
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});
*/

// Defining methods for the foodNameController
module.exports = {
  addFavouriteById: function(req, res) {
    console.log("HELLLLLOOOOOOOOOO:", req.params.foodId);
    db.FoodName.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // sequelize
    //   .query(
    //     // "SELECT foodname.FoodID, foodname.FoodCode, foodname.FoodGroupID, foodname.FoodDescription, favouritefoods.FoodID as Favourite " +
    //     "INSERT INTO favouriteFood " + "(1,7) "
    //   )
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.FoodName.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByFoodGroupId: function(req, res) {
    // db.FoodName.findAll(req.query)
    // db.FoodName.findAll({
    //   order: [["FoodDescription", "ASC"]],
    //   where: {
    //     foodGroupId: req.params.foodGroupId
    //   }
    // })
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
  },
  findAllDetails: function(req, res) {
    console.log("req.query is:", req.query);
    sequelize
      .query(
        "SELECT foodname.FoodID,foodname.FoodDescription,foodgroup.FoodGroupName " +
          "FROM foodname " +
          "INNER JOIN foodgroup " +
          "ON foodname.FoodGroupID=foodgroup.FoodGroupID"
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

  // findAllDetails: function(req, res) {
  //   console.log("req.query is:", req.query);
  //   db.FoodName.findAll({
  //     where: {
  //       foodId: 2
  //     }
  //   })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
