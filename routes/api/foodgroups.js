const router = require("express").Router();
const foodGroupController = require("../../controllers/foodGroupController");

// Matches with "/api/foodgroup"
router.route("/").get(foodGroupController.findAll);

module.exports = router;
