const db = require("../models");

// Defining methods for the foodGroupController
module.exports = {
  findAll: function(req, res) {
    db.FoodGroup.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
