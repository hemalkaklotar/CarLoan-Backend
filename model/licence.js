// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const license = sequelize.define("LicenceDetails", {
    licence_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notNull: {
          msg: "Please Check License id",
        },
      },
    },
    licenceNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    firstNameOnDrivingLicense: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isDate: true,
        isAfter: "1901-01-01",
        isBefore: "2003-12-31",
      },
    },
    lastNameOnDrivingLicense: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expieryDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    licenseType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    issue_state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "UserDetails",
        key: "user_id",
      },
    },
  });
  return license;
};
