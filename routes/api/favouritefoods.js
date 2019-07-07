const router = require("express").Router();
const favouriteFoodController = require("../../controllers/favouriteFoodController");

// Matches with "/api/foodName"
// router
//   .route("/")
//   .get(foodNameController.findAll)
//   .post(foodNameController.create);
router
  .route("/")
  .get(favouriteFoodController.findAll)
  .post(favouriteFoodController.create)
  .delete(favouriteFoodController.delete);
// router.route("/:id").post(favouriteController.addFavouriteById);
// matches with "/api/foodName/addFavouriteById/:foodId"
// router.route("/addFavouriteById").get(foodNameController.addFavouriteById);

module.exports = router;
