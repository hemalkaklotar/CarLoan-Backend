const db = require("../model");
const CAR = db.car;

let carInfo = {
  companyName: null,
  modelName: null,
  modelType: null,
  modelYear: null,
};
exports.getCarComponyList = (req, res) => {
  //   const { user_id } = req.data;
  CAR.findAll({
    attributes: ["companyName"],
    group: ["companyName"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};

exports.getCarModelList = (req, res) => {
  const { companyName } = req.params;
  carInfo.companyName = companyName;
 
  CAR.findAll({
    where: { companyName },
    attributes: ["modelName"],
    group: ["modelName"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};

exports.getCarYearsList = (req, res) => {
  const { modelName } = req.params;
  carInfo.modelName = modelName;
  
  CAR.findAll({
    where: { modelName },
    attributes: ["modelYear"],
    group: ["modelYear"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};
exports.getCarModelTypeList = (req, res) => {
  const { modelYear } = req.params;
  carInfo.modelYear = modelYear;
  CAR.findAll({
    where: {
      modelYear: carInfo.modelYear,
      modelName: carInfo.modelName,
      companyName: carInfo.companyName,
    },
    attributes: ["modelType"],
    group: ["modelType"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};

exports.getCarID = (req, res) => {
  const { companyName, modelName, modelType, modelYear } = req.body;
  CAR.findOne({
    where: { modelYear, companyName, modelName, modelType },
    attributes: ["car_id"],
    // group: ["modelType"],
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};
