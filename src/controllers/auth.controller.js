import jwt from 'jsonwebtoken';
import { SECRET } from "../config.js";
import UsersTable from '../models/User';
import RolesTable from '../models/Rol';
import UserRolTable from '../models/UserRol';
import bcrypt from 'bcryptjs';
import PermissionsTable from '../models/Permission';
import ModulsTable from '../models/Modul';

export const signup = async (req, res) => {
    const { name, email, user, password, status } = req.body;

    try {

        const existeUsuario = await UsersTable.findOne({ where: { user: user } });
        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const existeEmail = await UsersTable.findOne({ where: { email: email } });
        if (existeEmail) {
            return res.status(400).json({ message: "El email ya existe" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }

        //encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UsersTable({ name, email, user, password: hashPassword });
        
        newUser.status = status;

        await newUser.save().then(async function (user) {
            //asignar rol inicial
            const roles = await RolesTable.findOne({ where: { name: 'Usuario Inicial' }});
            const userRol = new UserRolTable({ user: user.id, rol: roles.id });
            await userRol.save();

            const permissions = await PermissionsTable.create({ rolid:roles.id, modulid: 1, r: 1, w: 0, u: 0, d: 0 });
            await permissions.save();

            res.status(201).json({
                message: 'User created successfully',
                data: user,
            });

        }).catch((error) => {
            res.status(500).json({
                message: 'Something goes wrong',
                console: error.message,
                data: {}
            });
        });

    } catch (error) {        
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            console: error.message,
            data: {}
            
        });
    }
};

export const signin = async (req, res) => {

    try {
        await UsersTable.findOne({ 
            where: { 
                user: req.body.user 
            },
            include: [
                {
                    model: UserRolTable,
                    attributes: { exclude: ['UsersTableId', 'RolsTableId'] },
                    include: [
                        {
                            model: RolesTable,
                            include: [
                                {
                                    model: PermissionsTable,
                                    include: [
                                        {
                                            model: ModulsTable
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(async (user) => {
            if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

            const matchPassword = await bcrypt.compare(req.body.password, user.password);
            if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña incorrecta" });

            // console.log(user);
            // console.log(user.email);
            //roles
            // console.log(user.UserRolTables.map(userRol => userRol.RolsTable.name));
            //modulos
            // console.log(user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.ModulsTable.name)));
            //permisos
            // console.log(user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.r)));

            const modulos = user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.ModulsTable.name));
            const permisos = user.UserRolTables.map(userRol => userRol.RolsTable.PermissionsTables.map(permission => permission.r));

            const modulospermisos = modulos.reduce((result, currentValue, index) => {
            result.push({
                modulo: currentValue,
                permisolectura: permisos[index]
            });
            return result;
            }, []);

            console.log(modulospermisos);

            const token = jwt.sign({ id: user.id, modulpermission: modulospermisos }, SECRET, {
                expiresIn: 86400 // 24 horas
            });

            res.json({user, token });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Something goes wrong',
                console: error.message,
                data: {}
            });
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            console: error.message,
            data: {}
        });
    }
};

//1:31:08