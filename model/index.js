const { Sequelize, sequelize } = require("../config/db.config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car = require("../model/car")(sequelize, Sequelize);
db.loanEnquiry = require("../model/loanEnquiry")(sequelize, Sequelize);
db.residencyDetail = require("../model/residency")(sequelize, Sequelize);
db.user = require("../model/user")(sequelize, Sequelize);
db.admin = require("../model/admin")(sequelize, Sequelize);
db.license = require("../model/licence")(sequelize, Sequelize);
db.expenses = require("../model/expenses")(sequelize, Sequelize);
db.income = require("../model/income")(sequelize, Sequelize);
// db.car = require("./car")(sequelize, Sequelize);

db.loanEnquiry.hasOne(db.expenses, {
  foreignKey: "unique_id",
  sourceKey: "loan_id",
});
db.expenses.belongsTo(db.loanEnquiry, {
  foreignKey: "unique_id",
  targetKey: "loan_id",
});
db.loanEnquiry.hasOne(db.income, {
  foreignKey: "unique_id",
  sourceKey: "loan_id",
});
db.income.belongsTo(db.loanEnquiry, {
  foreignKey: "unique_id",
  targetKey: "loan_id",
});

db.loanEnquiry.belongsTo(db.user, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
// db.user.hasMany(db.loanEnquiry, {
//   foreignKey: "loan_id",
//   sourceKey: "user_id",
// });
module.exports = db;
