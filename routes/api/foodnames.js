const router = require("express").Router();
const foodNameController = require("../../controllers/foodnameController");

// Matches with "/api/foodgroup"
// router
//   .route("/")
//   .get(foodGroupController.findAll)
//   .post(foodGroupController.create);
router.route("/").get(foodNameController.findAll);
router.route("/details").get(foodNameController.findAllDetails);

// Matches with "/api/foodgroup/:id"
// router
//   .route("/:id")
//   .get(foodGroupController.findById)
//   .put(foodGroupController.update)
//   .delete(foodGroupController.remove);

module.exports = router;
