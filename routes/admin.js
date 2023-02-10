const express = require("express");
const route = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const allowAccess = require("../middleware/RouteAccess");
const role = require("../Role");

const {
  createNewCar,
  deleteAllCar,
  showAllCar,
  deleteByid,
} = require("../controller/Admin/manageCar");
const { findAllUsers } = require("../controller/user");
const {
  createNewAdmin,
  adminlogin,
  createNewAgent,
  getAllAgentList,
  getAllAgent,
  getAgentLoanList,
} = require("../controller/Admin/ManageAdmin");
const { createNewResidency } = require("../controller/Admin/manageResidency");
const {
  updateLoanStatus,
  AssignLoan,
} = require("../controller/Admin/manageLoanStatus");

const {
  showAllRequestedLoans,
  showInProgressRequest,
  showCategoriesRequest,
  getSingleLoan,
} = require("../controller/customerJourney");

route.post("/createAdmin", createNewAdmin);
route.post("/login", adminlogin);

route.post("/createAgent", createNewAgent);
route.post(
  "/getAllAgent",
  verifyToken,
  allowAccess([role.Admin]),
  getAllAgentList
);
route.get("/getAllAgent", verifyToken, allowAccess([role.Admin]), getAllAgent);
route.get(
  "/getAgentLoanList/:userid",
  verifyToken,
  allowAccess([role.Admin]),
  getAgentLoanList
);

route.get("/getallUser", findAllUsers);

// manage the cars
route.post("/addcar", createNewCar);
route.get("/showcar", showAllCar);
route.delete("/deleteAllcar", deleteAllCar);
route.delete("/deletecar/:id", deleteByid);

// mange residency
route.post("/createReidency", createNewResidency);

// mange all loans
route.post("/showAllrequestedLoan", showAllRequestedLoans);
route.get("/getSingleLoan/:loanId", getSingleLoan);

// route.get("/showInProgressRequest", showInProgressRequest);
route.post("/showCategoriesRequest", showCategoriesRequest);

route.put("/manageLoanStatus", updateLoanStatus);
route.put("/assignLoan", AssignLoan);

module.exports = route;
