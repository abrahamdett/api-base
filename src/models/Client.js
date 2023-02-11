const {Sequelize, DataTypes, Model} = require('sequelize'); 
var db = require('../database');

class ClientsTable extends Model {}

ClientsTable.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(100),
    contact: Sequelize.STRING(100),
    phone: Sequelize.BIGINT(10),
    email: Sequelize.STRING(100),
    tickets: Sequelize.INTEGER(10),
    logos: Sequelize.INTEGER(10),
    imageurllogo: Sequelize.STRING,
    status: Sequelize.INTEGER(10),
},{
    db,
    sequelize: db,
    timestamps: true,
    modelName: 'ClientsTable',
    tableName: 'clients'
});

module.exports  = ClientsTable;