require("dotenv").config();
const db = require("../../../model");
const USER = db.user;
const ADMIN = db.admin;
const LOANENQUIRY = db.loanEnquiry;

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function VaidateCreateAdmin(ADMIN) {
  const JoiSchema = Joi.object({
    mobileNumber: Joi.number()
      .integer()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required()
      .messages({
        "number.min": "Mobile number should be 10 digit.",
        "number.max": "Mobile number should be 10 digit",
      }),
    password: Joi.string().required("Paswword can not be empty"),
    // role: Joi.string().required("Role should be required").valid("Admin"),
  });
  return JoiSchema.validateAsync(ADMIN);
}

exports.createNewAdmin = async (req, res) => {
  // res.send(req.body);
  VaidateCreateAdmin(req.body).then(async (value) => {
    const { mobileNumber, password } = value;
    const salt = await bcrypt.genSalt(9);
    const newpassword = await bcrypt.hash(password, salt);
    // res.send(newpassword)
    ADMIN.create({ mobileNumber, password: newpassword })
      .then((data) => {
        res.status(200).send({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message,
        });
      });
  });
};
exports.adminlogin = async (req, res) => {
  const { mobileNumber, password } = req.body;
  const findAdmin = await ADMIN.findOne({
    where: { mobileNumber },
    attributes: { mobileNumber },
  });

  if (findAdmin) {
    const validate = await bcrypt.compare(password, findAdmin.password);
    if (validate) {
      let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
      const { admin_id, role } = findAdmin;
      const information = {
        user_id: admin_id,
        role,
      };
      const Token = jwt.sign(information, JWTSECREATKEY);
      res.status(200).json({
        role: role,
        message: "You have been succsessfully Loged in",
        token: Token,
      });
    } else {
      res.status(204).send({
        success: false,
        message: "Invalid Mobile Number or password",
      });
    }
  } else {
    res.status(204).send({
      success: false,
      message: "Invalid Mobile Number",
    });
  }
};
function VaidateCreateAgent(USER) {
  const JoiSchema = Joi.object({
    firstName: Joi.string().required("First Name  should be required"),
    lastName: Joi.string().required("Last Name  should be required"),

    mobileNumber: Joi.number()
      .integer()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required("Mobile Number is Required"),
    role: Joi.string().valid("Agent"),
  });
  return JoiSchema.validateAsync(USER);
}
exports.createNewAgent = async (req, res) => {
  VaidateCreateAgent(req.body).then(async (value) => {
    const { firstName, lastName, mobileNumber, role } = value;
    const isAgentExist = await USER.findOne({
      where: [
        {
          mobileNumber: mobileNumber,
          role: "Agent",
        },
      ],
    });
    if (!isAgentExist) {
      USER.create({
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        role: role,
      }).then((data) => {
        res.status(200).json({ message: "Agent Added Successfully", data });
      });
    } else {
      res
        .status(400)
        .send({ message: "Agent Is Already Exist with this Mobile" });
    }
  });
};

exports.getAllAgent = async (req, res) => {
  USER.findAll({
    where: {
      role: "Agent",
    },
    attributes: ["firstName", "lastName", "mobileNumber", "user_id"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      data,
    });
  });
};
exports.getAllAgentList = async (req, res) => {
  let { recordsPerPage, pageNumber } = req.body;

  const length = await USER.count({
    where: {
      role: "Agent",
    },
  });
  USER.findAll({
    where: {
      role: "Agent",
    },
    attributes: ["firstName", "lastName", "mobileNumber", "user_id"],
    limit: recordsPerPage,
    offset: (pageNumber - 1) * recordsPerPage,
  }).then((data) => {
    res.status(200).send({
      success: true,
      data,
      length,
    });
  });
};
exports.getAgentLoanList = async (req, res) => {
  let { userid } = req.params;
  LOANENQUIRY.findAll({
    where: {
      Agent_id: userid,
    },
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
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};
