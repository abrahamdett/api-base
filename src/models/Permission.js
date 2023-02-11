const {Sequelize, DataTypes, Model} = require('sequelize');
var db = require('../database');

class PermissionsTable extends Model {}

PermissionsTable.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rolid: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'rols',
            key: 'id',
        },
    },
    modulid: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'moduls',
            key: 'id',
        },
    },
    r: Sequelize.INTEGER(10),
    w: Sequelize.INTEGER(10),
    u: Sequelize.INTEGER(10),
    d: Sequelize.INTEGER(10),
},{
    db,
    sequelize: db,
    timestamps: true,
    modelName: 'PermissionsTable',
    tableName: 'permissions'
});

module.exports  = PermissionsTable;