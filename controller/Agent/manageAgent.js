const db = require("../../model");
const USER = db.user;
const jwt = require("jsonwebtoken");
const LOANENQUIRY = db.loanEnquiry;

exports.findAgent = async (req, res) => {
  const { mobileNumber } = req.body;
  const findUser = await USER.findOne({
    where: [{ mobileNumber, role: "Agent" }],
  });

  if (findUser === null) {
    res.status(400).send({
      success: false,
      message: "Invalid Mobile Number",
    });
  } else {
    let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
    const { user_id, role } = findUser;
    const information = {
      user_id: user_id,
      role,
    };

    const Token = jwt.sign(information, JWTSECREATKEY);

    res.status(200).send({
      success: true,
      message: "You have been succsessfully Loged in",
      token: Token,
      role,
    });
  }
};

exports.showmyAllLoan = async (req, res) => {
  let { recordsPerPage, pageNumber } = req.body;

  const { user_id, role } = req.data;
  LOANENQUIRY.findAll({
    where: { Agent_id: user_id },
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
  }).then((data) =>
    res.status(200).send({
      success: true,
      data,
    })
  );
};
exports.showmyCategorisedLoan = async (req, res) => {
  let { recordsPerPage, pageNumber, loan_status } = req.body;
  const { user_id, role } = req.data;

  const length = await LOANENQUIRY.count({
    where: {
      loan_status: loan_status,
      Agent_id: user_id,
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
