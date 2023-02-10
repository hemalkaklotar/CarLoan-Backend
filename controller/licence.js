const db = require("../model");
const LICENCEDETAILS = db.license;
const { Sequelize } = require("../model");
const { Op } = Sequelize;
exports.getLicenceDetails = (req, res) => {
  const { user_id } = req.data;
  LICENCEDETAILS.findOne({
    where: { user_id },
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};
exports.createNewLicence = (req, res) => {
  const { user_id } = req.data;
  // res.send(req.data)
  // LICENCEDETAILS.findOne({
  //   where: { user_id },
  // })
  const licenceInfo = LICENCEDETAILS.findOne({
    where: { user_id },
  });
  LICENCEDETAILS.create({ ...req.body, user_id })
    .then(() => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message,
      });
    });
};
exports.updateLicenceDetails = async (req, res) => {
  const { user_id } = req.data;
  const licence = await LICENCEDETAILS.findOne({ where: { user_id } });
  const { licenceNumber } = req.body;
  const isLicenceExist = await LICENCEDETAILS.findOne({
    where: { licenceNumber: licenceNumber, user_id: { [Op.ne]: user_id } },
  });
  // res.status(200).json(licence);

  if (licence) {
    if (isLicenceExist === null) {
      LICENCEDETAILS.update(
        { ...req.body, user_id },
        { where: { user_id } }
      ).then((data) => {
        res.status(200).send({
          success: true,
          message: "Licence Update Successfully",
        });
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Licence already Exist",
      });
    }
  } else {
    if (isLicenceExist === null) {
      LICENCEDETAILS.create({ ...req.body, user_id }).then((data) => {
        res.status(200).send({
          success: true,
          message: "Licence added succesfully",
        });
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Licence already Exist",
      });
    }
  }

  // if (licence == null) {
  //   LICENCEDETAILS.create({ ...req.body, user_id }).then((data) => {
  //     res.status(200).send({
  //       success: true,
  //       message: "Licence added succesfully",
  //     });
  //   });
  // } else {
  //   LICENCEDETAILS.update(
  //     { ...req.body, user_id },
  //     { where: { user_id } }
  //   ).then((data) => {
  //     res.status(200).send({
  //       success: true,
  //       message: "Licence  Update Successfully",
  //     });
  //   });
  // }
};
