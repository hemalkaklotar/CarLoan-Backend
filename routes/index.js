const express = require("express");
const route = express.Router();

route.use("/", require("./customerJourney"));
route.use("/admin", require("./admin"));
route.use("/agent", require("./agent"));

module.exports = route;
