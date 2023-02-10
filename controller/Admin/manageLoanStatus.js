const db = require("../../model");
const LOANENQIRY = db.loanEnquiry;
const Joi = require("joi");
const { Sequelize } = require("../../model");
const { Op } = Sequelize;
// create new residency
function ValidateLoanStatus(LOANENQIRY) {
  const JoiSchema = Joi.object({
    loan_status: Joi.string()
      .required("Loan Status Detail should be required")
      .valid("Pending", "InProgress", "InReview", "Rejected", "Approved"),
    loan_id: Joi.array().items(
      Joi.number().integer().required("Loan Id Should be required")
    ),
  });
  return JoiSchema.validateAsync(LOANENQIRY);
}
exports.updateLoanStatus = (req, res) => {
  ValidateLoanStatus(req.body)
    .then(async (value) => {
      const { loan_id, loan_status } = value;
      //       res.send({ loan_id });
      const loan = await LOANENQIRY.findAll({
        where: { loan_id: { [Op.in]: loan_id } },
      });
      let length = loan.length;
      if (loan.length > 0) {
        //      res.send({ length });
        LOANENQIRY.update(
          { loan_status: loan_status },
          {
            where: { loan_id: { [Op.in]: loan_id } },
          }
        ).then((data) => {
          res.status(200).send({
            success: true,
            data: "Loan Update Successfully",
          });
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Loan does not found",
        });
      }
    })
    .catch((e) => res.send(e.message));
};

exports.AssignLoan = async (req, res) => {
  const { agentid, loanIdList } = req.body;
  const loanIds = await LOANENQIRY.findAll({
    where: { loan_id: { [Op.in]: loanIdList } },
  });

  if (loanIdList.length > 0) {
    LOANENQIRY.update(
      { Agent_id: agentid },
      {
        where: { loan_id: { [Op.in]: loanIdList } },
      }
    ).then((data) => {
      res.status(200).send({
        success: true,
        data: "Loan Assign Successfully",
      });
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Agent does not found",
    });
  }
};
