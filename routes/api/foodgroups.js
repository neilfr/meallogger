const router = require("express").Router();
const foodGroupController = require("../../controllers/foodGroupController");

// Matches with "/api/foodgroup"
// router
//   .route("/")
//   .get(foodGroupController.findAll)
//   .post(foodGroupController.create);
router.route("/").get(foodGroupController.findAll);

// Matches with "/api/foodgroup/:id"
// router
//   .route("/:id")
//   .get(foodGroupController.findById)
//   .put(foodGroupController.update)
//   .delete(foodGroupController.remove);

module.exports = router;
