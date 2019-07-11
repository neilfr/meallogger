const router = require("express").Router();
const consumptionLogController = require("../../controllers/consumptionLogController");

// "/api/consumptionlog"
router
  .route("/")
  .get(consumptionLogController.findAll)
  .post(consumptionLogController.create)
  .put(consumptionLogController.update);

router.route("/:consumptionLogId").delete(consumptionLogController.delete);
// router.route("/:consumptionLogId").update(consumptionLogController.update);

router.route("/:userId").get(consumptionLogController.findByUserId);

module.exports = router;
