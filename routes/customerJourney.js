const express = require("express");
const route = express.Router();

const allowAccess = require("../middleware/RouteAccess");
const verifyToken = require("../middleware/VerifyToken");
const role = require("../Role");

const {
  getLicenceDetails,
  updateLicenceDetails,
  createNewLicence,
} = require("../controller/licence");
const {
  createNewIncome,
  getLatestIncomeList,
  updateIncome,
  DeleteAllIncome,
} = require("../controller/income");

const {
  createNewExpenses,
  getLatestExpenseList,
  DeleteAllExpenses,
  updateExpenses,
  getAllExpensesList,
} = require("../controller/expenses");
const {
  createNewUSerIfNotExist,
  updateUserDetail,
  findAllUsers,
  getMyDetails,
} = require("../controller/user");
const {
  createLoanRequest,
  getMyAllLoanRequests,
  getmylatestRequest,
  getMyAllInProgressLoanRequest,
  getMyAllInReviewLoanRequest,
} = require("../controller/loan");

const {
  getCarComponyList,
  getCarModelList,
  getCarYearsList,
  getCarModelTypeList,
  getCarID,
} = require("../controller/cars");

route.post("/newuser", createNewUSerIfNotExist);
route.post(
  "/requestLoan",
  verifyToken,
  allowAccess([role.User]),
  createLoanRequest
);

route.get("/userDetail", verifyToken, allowAccess([role.User]), getMyDetails);
route.put("/userDetail/update", verifyToken, updateUserDetail);

route.post("/create-licence", verifyToken, createNewLicence);
route.get("/licence", verifyToken, getLicenceDetails);
route.post("/licenceDetail/update", verifyToken, updateLicenceDetails);

// car Details
route.get("/carCompanyList", getCarComponyList);
route.get("/carModelList/:companyName", getCarModelList);
route.get("/carYearList/:modelName", getCarYearsList);
route.get("/CarModelTypeList/:modelYear", getCarModelTypeList);
route.post("/getCarId/", getCarID);

// route.get("/expenses", verifyToken, getExpensesIncomeDetails);
route.post("/incomeDetail", verifyToken, createNewIncome);
route.get("/latestIncomeList/:id", verifyToken, getLatestIncomeList);
route.delete("/deleteAllIncome", DeleteAllIncome);
route.put("/incomeDetail/:loan_id", verifyToken, updateIncome);

route.post("/expensesDetail", verifyToken, createNewExpenses);
route.get("/latestExpenseList/:id", verifyToken, getLatestExpenseList);
route.delete("/deleteAllExpenses", DeleteAllExpenses);
route.put("/expensesDetail/:loan_id", verifyToken, updateExpenses);
route.get("/getAllExpensesList", getAllExpensesList);

// route.get("/getallUser", findAllUsers);
route.post("/getMyAllLoanRequest", verifyToken, getMyAllLoanRequests);
route.get(
  "/getMyAllInProgressLoanRequest",
  verifyToken,
  getMyAllInProgressLoanRequest
);
route.get(
  "/getMyAllInReviewLoanRequest",
  verifyToken,
  getMyAllInReviewLoanRequest
);
route.get("/getMyLastestRequest", verifyToken, getmylatestRequest);

module.exports = route;
