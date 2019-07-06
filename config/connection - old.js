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

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = sequelize;
