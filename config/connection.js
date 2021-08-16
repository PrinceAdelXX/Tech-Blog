// import Sequelize constructor
const Sequelize = require('sequelize');
let sequelize;

require('dotenv').config();

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize("tech_blog_db", "root", "saber", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}



module.exports = sequelize;