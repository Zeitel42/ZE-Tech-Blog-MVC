const { Model, DataTypes, DATE, INTEGER } = require("sequelize");

// import our database connection from config.js
const sequelize = require("../config/config");

const bcrypt = require("bcrypt");

// Initialize Product model (table) by extending off Sequelize's Model class
class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

// set up fields and rules for Product model
User.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },

  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;

// const Sequelize = require("sequelize");
// const sequelizeConnection = require("../config/config");
// const bcrypt = require("bcrypt");

// const User = sequelizeConnection.define(
//   "user",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         len: [8],
//       },
//     },
//   },
//   {
//     sequelize: sequelizeConnection,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "users",
//   }
// );

// User.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });

// module.exports = User;
