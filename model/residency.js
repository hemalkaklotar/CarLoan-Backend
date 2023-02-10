const db = require("../config/db.config");

// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const ResidencyDetails = sequelize.define("ResidencyDetails", {
    residency_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    residencyStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    livingSituation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return ResidencyDetails;
};
