const db = require("../model");
const LOANENQUIRY = db.loanEnquiry;
const USER = db.user;

// const EXPENSES = db.expenses;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");
const { sequelize } = require("../model");

exports.getMyDetails = (req, res) => {
  const { user_id } = req.data;
  USER.findOne({
    where: { user_id },
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};

exports.updateUserDetail = async (req, res) => {
  const { user_id } = req.data;
  const user = await USER.findOne({ where: { user_id } });
  if (user) {
    USER.update(req.body, { where: { user_id } }).then((data) => {
      res.status(200).send({
        success: true,
        data: "User Update Successfully",
      });
    });
  } else {
    res.status(400).send({
      success: false,
      message: "User does not found",
    });
  }
};

exports.getMyAllLoanRequests = (req, res) => {
  const { user_id } = req.data;
  LOANENQUIRY.findAndCountAll({
    where: { user_id },
  }).then((data) =>
    res.status(200).send({
      success: true,
      data: data.rows,
    })
  );
};

exports.findAllUsers = (req, res) => {
  USER.findAll()
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

exports.showAllRequestedLoans = async (req, res) => {
  let { recordsPerPage, pageNumber } = req.body;
  // res.send({ recordsPerPage: recordsPerPage, pageNumber: pageNumber });
  const length = await LOANENQUIRY.count();
  LOANENQUIRY.findAll({
    where: {},
    limit: recordsPerPage,
    offset: (pageNumber - 1) * recordsPerPage,
    include: [
      {
        model: db.expenses,
        required: false,
        where: {},
      },
      {
        model: db.income,
        required: false,
        where: {},
      },
      {
        model: db.user,
        required: false,
        where: {},
      },
      // {
      //   model: db.user,
      //   required: false,
      //   where: {},
      //   attributes: ["user_id"],
      //   on: {
      //     user_id: {[Op.eq]:sequelize.col(LOANENQUIRY.)},
      //   },
      // },
    ],
  })
    .then((data) => {
      // res.send(data);
      res.status(200).send({
        success: true,
        data: data,
        length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};

exports.getSingleLoan = async (req, res) => {
  let { loanId } = req.params;
  // res.send({ recordsPerPage: recordsPerPage, pageNumber: pageNumber });
  LOANENQUIRY.findOne({
    where: { loan_id: loanId },
    include: [
      {
        model: db.expenses,
        required: false,
        where: {},
      },
      {
        model: db.income,
        required: false,
        where: {},
      },
      {
        model: db.user,
        required: false,
        where: {},
      },
    ],
  })
    .then((data) => {
      // res.send(data);
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

exports.showCategoriesRequest = async (req, res) => {
  let { recordsPerPage, pageNumber, loan_status } = req.body;

  const length = await LOANENQUIRY.count({
    where: {
      loan_status: loan_status,
    },
  });

  LOANENQUIRY.findAll({
    where: {
      loan_status: loan_status,
    },
    limit: recordsPerPage,
    offset: (pageNumber - 1) * recordsPerPage,
    include: [
      {
        model: db.expenses,
        required: false,
        where: {},
      },
      {
        model: db.income,
        required: false,
        where: {},
      },
      {
        model: db.user,
        required: false,
        where: {},
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        success: true,
        data: data,
        length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};

// exports.showInProgressRequest = (req, res) => {
//   LOANENQUIRY.findAll({
//     where: {
//       loan_status: "InProgress",
//     },
//     include: [
//       {
//         model: db.expenses,
//         required: false,
//         where: {},
//       },
//       {
//         model: db.income,
//         required: false,
//         where: {},
//       },
//       {
//         model: db.user,
//         required: false,
//         where: {},
//       },
//     ],
//   })
//     .then((data) => {
//       res.status(200).send({
//         success: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         success: true,
//         message: err.message,
//       });
//     });
// };
