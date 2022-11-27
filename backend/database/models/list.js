const { DataTypes } = require('sequelize');

//Custom imports
const sequelize = require.main.require('./database/connections/mysql_conn').geSequelizeObject();

const List = sequelize.define('lists', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Creating table
sequelize.sync();
module.exports = List;