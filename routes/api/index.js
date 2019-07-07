const router = require("express").Router();

const foodGroupRoutes = require("./foodgroups");
const foodNameRoutes = require("./foodnames");
const favouriteFoodRoutes = require("./favouritefoods");

router.use("/foodgroups", foodGroupRoutes);
router.use("/foodnames", foodNameRoutes);
router.use("/favouritefoods", favouriteFoodRoutes);

module.exports = router;
