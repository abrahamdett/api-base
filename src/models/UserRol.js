const {Sequelize, DataTypes, Model} = require('sequelize');
var db = require('../database');

class UserRolTable extends Model {}

UserRolTable.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    rol: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'rols',
            key: 'id',
        },
    },
},{
    db,
    sequelize: db,
    timestamps: true,
    modelName: 'UserRolTable',
    tableName: 'user_rol'
});

module.exports  = UserRolTable;