const router = require("express").Router();
const foodNameController = require("../../controllers/foodnameController");

// Matches with "/api/foodName"
// router
//   .route("/")
//   .get(foodNameController.findAll)
//   .post(foodNameController.create);
router.route("/").get(foodNameController.findAll);
router.route("/details").get(foodNameController.findAllDetails);

// Matches with "/api/foodName/:foodGroupId"
router.route("/:foodGroupId").get(foodNameController.findByFoodGroupId);
//   .put(foodNameController.update)
//   .delete(foodNameController.remove);

module.exports = router;
