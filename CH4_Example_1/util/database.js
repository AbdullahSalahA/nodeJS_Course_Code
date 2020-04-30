const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'mySqL87K$F0D', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
