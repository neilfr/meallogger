const router = require("express").Router();
const foodNameController = require("../../controllers/foodnameController");

// Matches with "/api/foodName"
router.route("/").get(foodNameController.findAll);

// Matches with "/api/foodName/:foodGroupId"
router.route("/:foodGroupId").get(foodNameController.findByFoodGroupId);

module.exports = router;
