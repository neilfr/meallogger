const router = require("express").Router();
const consumptionLogController = require("../../controllers/consumptionLogController");

// "/api/foodName"
router
  .route("/")
  .get(consumptionLogController.findAll)
  .post(consumptionLogController.create);

router.route("/:consumptionLogId").delete(consumptionLogController.delete);

router.route("/:userId").get(consumptionLogController.findByUserId);

module.exports = router;
