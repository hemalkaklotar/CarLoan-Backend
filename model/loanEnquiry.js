const expenses = require("../model/expenses");
module.exports = (sequelize, Sequelize) => {
  const loanEnquiryGenerate = sequelize.define(
    "loanEnquiry",
    {
      loan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        validate: {
          notNull: {
            msg: "Please enter your loan id",
          },
        },
      },
      purchasePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      deposite: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      term: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balloon: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      selectedCar: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CarDetails",
          key: "car_id",
        },
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modelYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modelName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modelType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      workDetail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "i am an employee",
              "i am an unemployed",
              "i am a business owner/ i have an ABN",
            ],
          ],
        },
      },
      monthlyIncome: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      loan_status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["Pending", "InProgress", "InReview", "Rejected", "Approved"]],
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UserDetails",
          key: "user_id",
        },
      },
      Agent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "UserDetails",
          key: "user_id",
        },
      },
    }

    // {
    //   timestamps: true,
    //   classMethods: {
    //     associate: function (models) {
    //       loanEnquiry.belongsTo(models.Expenses, { foreignKey: "user_id" });
    //     },
    //   },
    // }
  );
  return loanEnquiryGenerate;
};
