const db = require("../model");
const INCOME = db.income;
exports.createNewIncome = (req, res) => {
  const { user_id } = req.data;

  INCOME.create({ ...req.body, user_id })
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
exports.getLatestIncomeList = (req, res) => {
  const { user_id } = req.data;
  const { id } = req.params;
  INCOME.findOne({
    where: [
      {
        user_id: user_id,
        loan_id: id,
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

exports.updateIncome = async (req, res) => {
  const { user_id } = req.data;
  const { loan_id } = req.params;
  const income = await INCOME.findOne({ where: { loan_id } });
  if (income) {
    INCOME.update(req.body, { where: { loan_id } }).then((data) => {
      res.status(200).send({
        success: true,
        data: "INCOME Update Successfully",
      });
    });
  } else {
    res.status(400).send({
      success: false,
      message: "INCOME does not found",
    });
  }
};

exports.DeleteAllIncome = (req, res) => {
  INCOME.destroy({
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
