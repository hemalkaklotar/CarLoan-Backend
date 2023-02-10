const db = require("../../model");
const RESIDENCY = db.residencyDetail;

// create new residency
exports.createNewResidency = (req, res) => {
  const residencydetails = {
    residencyStatus: req.body.residencyStatus,
    livingSituation: req.body.livingSituation,
  };

  RESIDENCY.create(residencydetails)
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
};

// display all cars
// exports.showAllCar = (req, res) => {
//   CAR.findAll()
//     .then((data) => {
//       res.status(200).json({
//         success: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     });
// };

// delete  all car
// exports.deleteAllCar = (req, res) => {
//   CAR.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((data) => {
//       res.status(200).json({
//         success: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     });
// };

// delete by id
// exports.deleteByid = (req, res) => {
//   const id = req.params.id;
//   CAR.destroy({
//     where: { car_id: id },
//   })
//     .then((data) => {
//       res.status(200).json({
//         sucess: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         sucess: false,
//         message: err.message,
//       });
//     });
// };
