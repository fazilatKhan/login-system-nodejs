const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
