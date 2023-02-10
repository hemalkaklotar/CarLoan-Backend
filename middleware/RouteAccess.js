const role = require("../Role");

function allowAccess(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.data.role)) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorised user",
      });
    }
    next();
  };
}
module.exports = allowAccess;
