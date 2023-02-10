

// const Model = db.Sequelize.Model;
// const sequelize = db.sequelize;
// const op = db.Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
  const CarDetails = sequelize.define("CarDetails", {
    car_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notNull: {
          msg: "Please enter your car id",
        },
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
      unique: true,
    },
  });

  
  return CarDetails;
};
