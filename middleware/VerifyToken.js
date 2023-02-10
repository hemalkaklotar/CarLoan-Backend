require("dotenv").config();
let jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let JWTSECREATKEY = process.env.JWT_SECREAT_KEY;
  let token;
  if (req.headers.token) {
    token = req.headers.token.split(" ")[1];
  }
  if (!token) {
    return res.status(401).send({
      success: false,
      error: "Not authorized to access this route",
    });
  } else {
    try {
      const decodeToken = jwt.verify(token, JWTSECREATKEY);
      const user_id = decodeToken.user_id;
      const role = decodeToken.role;

      if (!user_id) {
        return res.status(401).send({
          success: false,
          error: "User Does not Found",
        });
      }
      req.data = { user_id, role };
      next();
    } catch (error) {
      return res.status(401).send({
        success: false,
        error: "Something went wrong",
      });
    }
  }
}

module.exports = verifyToken;
