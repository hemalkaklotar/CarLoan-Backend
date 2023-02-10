const db = require("../model");
const LOANENQUIRY = db.loanEnquiry;
const Joi = require("joi");

function ValidateNewLoan(LOANENQUIRY) {
  const JoiSchema = Joi.object({
    purchasePrice: Joi.number()
      .integer()
      .required("Purchase Price should be required"),
    deposite: Joi.number()
      .integer()
      .required("Deposite prcie should be require"),
    term: Joi.string().required("Term should be required"),
    balloon: Joi.number()
      .integer()
      .required("Balloon percentage should be required"),
    selectedCar: Joi.number()
      .integer()
      .required("Selected Car should be required"),
    companyName: Joi.string().required("Company Name  should be required"),
    modelYear: Joi.string().required("Model Year  should be required"),
    modelName: Joi.string().required("Model Name  should be required"),
    modelType: Joi.string().required("Model Type  should be required"),
    workDetail: Joi.string()
      .required("Work Detail should be required")
      .valid(
        "i am an employee",
        "i am an unemployed",
        "i am a business owner/ i have an ABN"
      ),
    monthlyIncome: Joi.number()
      .integer()
      .required("Monthly Income  should be required"),

    loan_status: Joi.string()
      .required("Loan Status Detail should be required")
      .valid("Pending", "InProgress", "InReview", "Rejected", "Approved"),
  });
  return JoiSchema.validateAsync(LOANENQUIRY);
}

exports.createLoanRequest = (req, res) => {
  ValidateNewLoan(req.body)
    .then(async (value) => {
      const { user_id } = req.data;
      const {
        purchasePrice,
        deposite,
        term,
        balloon,
        selectedCar,
        companyName,
        modelYear,
        modelName,
        modelType,
        workDetail,
        monthlyIncome,
        loan_status,
      } = req.body;
      const loanEnquuiryDetails = {
        purchasePrice: purchasePrice,
        deposite: deposite,
        term: term,
        balloon: balloon,
        selectedCar: selectedCar,
        companyName: companyName,
        modelYear: modelYear,
        modelName: modelName,
        modelType: modelType,
        workDetail: workDetail,
        monthlyIncome: monthlyIncome,
        loan_status: loan_status,
      };
      LOANENQUIRY.create({ ...loanEnquuiryDetails, user_id })
        .then((data) => {
          res.status(200).send({
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: err,
          });
        });
    })
    .catch((e) => res.status(500).json(e.message));
};

exports.getMyAllLoanRequests = async (req, res) => {
  let { recordsPerPage, pageNumber } = req.body;
  const { user_id } = req.data;
  const length = await LOANENQUIRY.count();

  LOANENQUIRY.findAndCountAll({
    where: { user_id },
    limit: recordsPerPage,
    offset: (pageNumber - 1) * recordsPerPage,
  }).then((data) =>
    res.status(200).send({
      success: true,
      data: data.rows,
      length,
    })
  );
};
exports.getmylatestRequest = (req, res) => {
  const { user_id } = req.data;
  LOANENQUIRY.findOne({
    where: { user_id },
    order: [["createdAt", "DESC"]],
    limit: 1,
  })
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
      })
    )
    .catch((e) => res.send("sds+"));
};

exports.getMyAllInProgressLoanRequest = async (req, res) => {
  const { user_id } = req.data;
  const length = await LOANENQUIRY.count();
  LOANENQUIRY.findAndCountAll({
    where: [
      {
        user_id: user_id,
        loan_status: "InProgress",
      },
    ],
  }).then((data) =>
    res.status(200).send({
      success: true,
      data: data.rows,
      length,
    })
  );
};
exports.getMyAllInProgressLoanRequest = async (req, res) => {
  const { user_id } = req.data;
  const length = await LOANENQUIRY.count();
  LOANENQUIRY.findAndCountAll({
    where: [
      {
        user_id: user_id,
        loan_status: "InProgress",
      },
    ],
  }).then((data) =>
    res.status(200).send({
      success: true,
      data: data.rows,
      length,
    })
  );
};
exports.getMyAllInReviewLoanRequest = async (req, res) => {
  const { user_id } = req.data;
  const length = await LOANENQUIRY.count();

  LOANENQUIRY.findAndCountAll({
    where: [
      {
        user_id: user_id,
        loan_status: "InReview",
      },
    ],
  }).then((data) =>
    res.status(200).send({
      success: true,
      data: data.rows,
      length,
    })
  );
};
