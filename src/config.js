import { config } from 'dotenv'
config();

export const SECRET = 'base-api';
export const PORT = process.env.PORT || 3000;

export const BD = "api-base";
export const USER = "root";
export const PASSWORD = "";
export const HOST = "localhost";
export const DIALECT = "mariadb";
//horario de invierno es a -6 y normal a -5
export const TIMEZONE = "-06:00";