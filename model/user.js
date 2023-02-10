// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const USerDetail = sequelize.define(
    "UserDetails",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          notNull: {
            msg: "Please Check user id",
          },
        },
      },
      mobileNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      prefix: {
        type: Sequelize.STRING,
        // allowNull: false,
        validate: {
          isIn: [["Mr", "Mrs"]],
        },
      },
      firstName: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      emailId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      state: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["User", "Agent", "Admin"]],
        },
        defaultValue: "User",
      },
    },
  );
  return USerDetail;
};
