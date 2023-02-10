const express = require("express");
const route = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const allowAccess = require("../middleware/RouteAccess");
const role = require("../Role");
const {
  findAgent,
  showmyAllLoan,
  showmyCategorisedLoan,
} = require("../controller/Agent/manageAgent");

route.post("/findAgent", findAgent);
route.post(
  "/showmyAllLoan",
  verifyToken,
  allowAccess([role.Agent]),
  showmyAllLoan
);
route.post(
  "/showMyCategoriesRequest",
  verifyToken,
  allowAccess([role.Agent]),
  showmyCategorisedLoan
);

module.exports = route;
