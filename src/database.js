const {Sequelize} = require('sequelize'); 
import { BD, USER, PASSWORD, HOST, DIALECT, TIMEZONE } from './config';

const db = new Sequelize(
    BD, 
    USER, 
    PASSWORD, 
    {
        host:HOST,
        dialect: DIALECT,
        timezone:TIMEZONE
});


try {
    db.authenticate();
    console.log('La conexión se ha establecido correctamente');
} catch (error) {
    console.error('No se ha podido establer conexón con la base de datos: ' + console.error());
}


module.exports = db;