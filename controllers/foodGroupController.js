const db = require("../models");
/*
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});
*/

// Defining methods for the foodGroupController
module.exports = {
  findAll: function(req, res) {
    db.FoodGroup.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
