const router = require("express").Router();
const favouriteFoodController = require("../../controllers/favouriteFoodController");

//  "/api/favouritefoods"
router
  .route("/")
  // .get(favouriteFoodController.findAll)
  .post(favouriteFoodController.create)
  .delete(favouriteFoodController.delete);

router.route("/:userId").get(favouriteFoodController.findByUserId);

module.exports = router;
