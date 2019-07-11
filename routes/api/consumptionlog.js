const router = require("express").Router();
const consumptionLogController = require("../../controllers/consumptionLogController");

// "/api/foodName"
router
  .route("/")
  .get(consumptionLogController.findAll)
  .post(consumptionLogController.create);

router.route("/:consumptionLogId").delete(consumptionLogController.delete);

router.route("/:userId").get(consumptionLogController.findByUserId);
// .post(favouriteFoodController.create)
// .delete(favouriteFoodController.delete);
// router.route("/:id").post(favouriteController.addFavouriteById);
// matches with "/api/foodName/addFavouriteById/:foodId"
// router.route("/addFavouriteById").get(foodNameController.addFavouriteById);

module.exports = router;
