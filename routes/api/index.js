const router = require("express").Router();

const foodGroupRoutes = require("./foodgroups");
const foodNameRoutes = require("./foodnames");
const favouriteFoodRoutes = require("./favouritefoods");
const consumptionLogRoutes = require("./consumptionlog");

router.use("/foodgroups", foodGroupRoutes);
router.use("/foodnames", foodNameRoutes);
router.use("/favouritefoods", favouriteFoodRoutes);
router.use("/consumptionlog", consumptionLogRoutes);

module.exports = router;
