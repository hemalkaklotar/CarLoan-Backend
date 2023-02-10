module.exports = (sequelize, Sequelize) => {
  const AdminDetail = sequelize.define("AdminDetails", {
    admin_id: {
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
    password: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["Admin"]],
      },
      defaultValue: "Admin",
    },
  });
  return AdminDetail;
};
