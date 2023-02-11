import jwt from 'jsonwebtoken';
import { SECRET } from "../config.js";
import ModulsTable from '../models/Modul';
import PermissionsTable from '../models/Permission';
import UsersTable from '../models/User';
import UserRolTable from '../models/UserRol';
import RolesTable from '../models/Rol';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        req.userModPer = decoded.modulpermission;

        const user = await UsersTable.findOne({ where: { id: req.userId }, attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
}

export const isPermisos = async (req, res, next) => {
    try {
        await UsersTable.findOne({ where: { id: req.userId },
            include: [{model: UserRolTable, attributes: { exclude: ['UsersTableId', 'RolsTableId'] },
            include: [{model: RolesTable , include: [{model: PermissionsTable,include: [{model: ModulsTable}]}]}]}]
        }).then(async (user) => {
            if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
            const modulos = user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.ModulsTable.name));
            const permisos = user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.r));

            const modulospermisos = modulos.reduce((result, currentValue, index) => {
            result.push({
                modulo: currentValue,
                permisolectura: permisos[index]
            });
            return result;
            }, []);

            const modulospermisosuser = modulospermisos.reduce((result, currentValue, index) => {
                if (currentValue.modulo == req.modulo) {
                    result.push({
                        modulo: currentValue.modulo,
                        permisolectura: currentValue.permisolectura
                    });
                }
                return result;
            }, []);

            if (modulospermisosuser.length > 0) {
                if (modulospermisosuser[0].permisolectura == 1) {
                    next();
                }else{
                    return res.status(401).json({ message: "No tiene permisos para acceder a este modulo" });
                }
            }else{
                return res.status(401).json({ message: "No tiene permisos para acceder a este modulo" });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Something goes wrong',
                console: error.message,
            });
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
}

export const isPermisosModul = (modulo) => async (req, res, next) => {
    req.modulo = modulo;
    await isPermisos(req, res, next);
}