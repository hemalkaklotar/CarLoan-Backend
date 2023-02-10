require("dotenv").config();
const db = require("../model");
const USER = db.user;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("../model");
const { Op } = Sequelize;

function VaidateCreateNewUSer(USER) {
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
  });
  return JoiSchema.validateAsync(USER);
}

exports.createNewUSerIfNotExist = async (req, res) => {
  VaidateCreateNewUSer(req.body)
    .then(async (value) => {
      const { mobileNumber } = value;
      const usedata = { mobileNumber, role: "User" };
      const isUserExist = await USER.findOne({
        where: { mobileNumber: mobileNumber, role: usedata.role },
      });
      if (!isUserExist) {
        USER.create(usedata)
          .then((data) => {
            let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
            const { user_id, role } = data;
            const information = {
              user_id,
              role,
            };
            const Token = jwt.sign(information, JWTSECREATKEY);
            res
              .cookie("token", Token, {
                maxAge: 1000 * 34 * 60,
                httpOnly: true,
                sameSite: "none",
                secure: true,
              })
              .status(200)
              .json({
                message: "New User",
                token: Token,
              });
          })
          .catch((err) => {
            res.status(500).json({
              success: true,
              message: err.message,
            });
          });
      } else {
        let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
        const { user_id, role } = isUserExist;
        const information = {
          user_id,
          role,
        };
        const Token = jwt.sign(information, JWTSECREATKEY);

        res
          .cookie("token", Token, {
            maxAge: 1000 * 34 * 32,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json({
            message: "Existing User",
            token: Token,
          });
      }
    })
    .catch((e) => res.status(500).json(e.message));
};

// res.status(200).send({
//   success: true,
//   Token: Token,
//   // Data: isUserExist,
// });

// }
// )
// .catch((e) => res.send(e.message));
// const { mobileNumber } = req.body;
// const usedata = {
//   mobileNumber,
// };
// const isUserExist = await USER.findOne({
//   where: { mobileNumber: mobileNumber },
// });

// if (!isUserExist) {
//   USER.create(usedata)
//     .then((data) => {
//       let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
//       const { user_id, role } = data;
//       const information = {
//         user_id,
//         role,
//       };
//       const Token = jwt.sign(information, JWTSECREATKEY);
//       res
//         .cookie("token", Token, {
//           maxAge: 1000 * 34 * 60,
//           httpOnly: true,
//           sameSite: "none",
//           secure: true,
//         })
//         .status(200)
//         .json({
//           message: "New User",
//           token: Token,
//         });
//     })

//     .catch((err) => {
//       res.status(500).json({
//         success: true,
//         message: err.message,
//       });
//     });
// } else {
//   let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
//   const { user_id, role } = isUserExist;
//   const information = {
//     user_id,
//     role,
//   };
//   const Token = jwt.sign(information, JWTSECREATKEY);
//   console.log("Token ----------------->", Token);

//   res
//     .cookie("token", Token, {
//       maxAge: 1000 * 34 * 32,
//       httpOnly: true,
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .json({
//       message: "Existing User",
//       token: Token,
//     });
//   // res.status(200).send({
//   //   success: true,
//   //   Token: Token,
//   //   // Data: isUserExist,
//   // });
// }
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

exports.getMyDetails = (req, res) => {
  const { user_id } = req.data;
  USER.findOne({
    attributes: { exclude: ["createdAt", "role", "updatedAt"] },
    where: { user_id },
  }).then((data) => {
    res.status(200).send({
      success: true,
      Data: data,
    });
  });
};

function ValidateUser(USER) {
  const JoiSchema = Joi.object({
    prefix: Joi.string().required().messages({
      "string.required": "prefix is required",
    }),
    firstName: Joi.string().required().messages({
      "string.required": "firstName is required",
    }),
    lastName: Joi.string().required().messages({
      "string.required": "lastName is required",
    }),
    state: Joi.string().required().messages({
      "string.required": "state is required",
    }),
    emailId: Joi.string()
      .required()
      .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
      .messages({
        "string.regex": "InProper emailId",
        "string.required": "EmailId is required",
      }),
  });
  return JoiSchema.validateAsync(USER);
}
exports.updateUserDetail = async (req, res) => {
  ValidateUser(req.body)
    .then(async (value) => {
      const { user_id } = req.data;
      const user = await USER.findOne({ where: { user_id } });
      const isEmailExist = await USER.findOne({
        where: { emailId: value.emailId, user_id: { [Op.ne]: user_id } },
      });
      if (user) {
        if (isEmailExist === null) {
          USER.update(value, { where: { user_id } }).then((data) => {
            res.status(200).send({
              success: true,
              data: "User Update Successfully",
            });
          });
        } else {
          res.status(200).send({
            success: false,
            data: "Email ID already Exist",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "User does not found",
        });
      }
    })
    .catch((e) => res.send(e.message));
  // const { user_id } = req.data;
  // const user = await USER.findOne({ where: { user_id } });
  // if (user) {
  //   USER.update(req.body, { where: { user_id } }).then((data) => {
  //     res.status(200).send({
  //       success: true,
  //       data: "User Update Successfully",
  //     });
  //   });
  // } else {
  //   res.status(400).send({
  //     success: false,
  //     message: "User does not found",
  //   });
  // }
};
