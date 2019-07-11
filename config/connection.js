const Sequelize = require("sequelize");

const sequelize = new Sequelize("meallogger_db", "root", "root", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

module.exports = sequelize;
