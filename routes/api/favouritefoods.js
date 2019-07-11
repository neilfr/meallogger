const router = require("express").Router();
const favouriteFoodController = require("../../controllers/favouriteFoodController");

// Matches with "/api/favouritefoods"
router
  .route("/")
  .get(favouriteFoodController.findAll)
  .post(favouriteFoodController.create)
  .delete(favouriteFoodController.delete);

module.exports = router;
