const {Sequelize, DataTypes, Model} = require('sequelize');
var db = require('../database');

class UsersTable extends Model {}

UsersTable.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    user:  Sequelize.STRING(50),
    password: Sequelize.STRING(100),
    tokenLogin: Sequelize.STRING,
    tokenNotification: Sequelize.STRING,
    status: Sequelize.INTEGER(10),
},{
    db,
    sequelize: db,
    timestamps: true,
    modelName: 'UsersTable',
    tableName: 'users'
});

module.exports  = UsersTable;