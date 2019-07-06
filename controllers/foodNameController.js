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
        "SELECT foodname.foodId, foodname.foodCode, foodname.foodGroupId, foodname.foodDescription, favouritefoods.foodId as favourite " +
          "FROM foodname " +
          "LEFT JOIN favouritefoods " +
          "ON foodname.foodId=favouritefoods.foodId " +
          "WHERE foodname.foodGroupID=22 " +
          "ORDER BY foodname.foodId ASC ",
        { type: sequelize.QueryTypes.SELECT }
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
