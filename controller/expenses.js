const db = require("../model");
const EXPENSES = db.expenses;
exports.createNewExpenses = (req, res) => {
  const { user_id } = req.data;
  console.log(
    "expensesList+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
    req.body
  );
  EXPENSES.create({ ...req.body, user_id })
    .then((data) => {
      res.status(200).send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};
exports.getLatestExpenseList = (req, res) => {
  const { user_id } = req.data;
  let { id } = req.params;
  let loan_id = Number(id);
  EXPENSES.findOne({
    where: [
      {
        user_id: user_id,
        loan_id: loan_id,
      },
    ],
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};

exports.getAllExpensesList = (req, res) => {
  // const { user_id } = req.data;
  EXPENSES.findAll({})
    .then((data) => {
      res.status(200).send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};
exports.DeleteAllExpenses = (req, res) => {
  EXPENSES.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

exports.updateExpenses = async (req, res) => {
  const { user_id } = req.data;
  const { loan_id } = req.params;
  const expenses = await EXPENSES.findOne({ where: { loan_id } });
  if (expenses) {
    EXPENSES.update(req.body, { where: { loan_id } }).then((data) => {
      res.status(200).send({
        success: true,
        data: "Expenses Update Successfully",
      });
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Expenses does not found",
    });
  }
};
