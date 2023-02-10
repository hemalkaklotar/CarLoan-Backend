const db = require("../config/db.config");

// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const Expenses = sequelize.define(
    "Expenses",
    {
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
      motorvehicalRunningCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      travellingCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      utilitiesCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      insurancesCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      telephoneAndInternetCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      entertainmentCost: {
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
    },
    // {
    //   timestamps: true,
    //   classMethods: {
    //     associate: function (models) {
    //       Expenses.hasOne(models.loanEnquiry, {
    //         as: "Expenses",
    //         foreignKey: 'user_id',
    //       });
    //     },
    //   },
    // }
  );
  return Expenses;
};
