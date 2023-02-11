const {Sequelize, DataTypes, Model} = require('sequelize');
var db = require('../database');

class RolsTable extends Model {}

RolsTable.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(100),
    description: Sequelize.STRING(100),
    status: Sequelize.INTEGER(10),
},{
    db,
    sequelize: db,
    timestamps: true,
    modelName: 'RolsTable',
    tableName: 'rols'
});

module.exports  = RolsTable;