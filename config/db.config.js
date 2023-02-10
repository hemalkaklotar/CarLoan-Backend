const env = require("./env");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(env.DB, env.USER, env.PASSWORD, {
  host: env.HOST,
  dialect: env.dialect,
  port: 1100,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.car = require("../model/car")(sequelize, Sequelize);
// db.loanEnquiry = require("../model/loanEnquiry")(sequelize, Sequelize);
// db.residencyDetail = require("../model/residency")(sequelize, Sequelize);
// db.user = require("../model/user")(sequelize, Sequelize);
// db.license = require("../model/licence")(sequelize, Sequelize);
// db.expenses = require("../model/expenses")(sequelize, Sequelize);
// db.income = require("../model/income")(sequelize, Sequelize);

module.exports = { Sequelize, sequelize };
