const Sequelize = require("sequelize");

// const sequelize = new Sequelize("meallogger_db", "root", "root", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   define: {
//     timestamps: false,
//     freezeTableName: true
//   }
// });

var fs = require("fs");
var path = require("path");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize("meallogger_db", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: false,
      freezeTableName: true
    }
  });
}

module.exports = sequelize;
