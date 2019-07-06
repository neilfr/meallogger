const router = require("express").Router();
// const bookRoutes = require("./books");
const foodGroupRoutes = require("./foodgroups");
const foodNameRoutes = require("./foodnames");

// Book routes
// router.use("/books", bookRoutes);
router.use("/foodgroups", foodGroupRoutes);
router.use("/foodnames", foodNameRoutes);

module.exports = router;
