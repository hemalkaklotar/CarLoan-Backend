
// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const Income = sequelize.define("Income", {
    unique_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notNull: {
          msg: "Please Check id",
        },
      },
    },
    hasAdditionalIncome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["Yes", "No"]],
      },
    },
    rentalIncomePerMonth: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    investmentIncome: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    salarySacrificePerMonth: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    centerlinkBenifit: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    forignIncomePerMonth: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "UserDetails",
        key: "user_id",
      },
    },
    loan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "loanEnquiries",
        key: "loan_id",
      },
    },
  });
  return Income;
};
