import RolesTable from '../models/Rol';
import UsersTable from '../models/User';
import ClientsTable from '../models/Client';
import UserRolTable from '../models/UserRol';
import db from '../database';
import ModulsTable from '../models/Modul';
import PermissionsTable from '../models/Permission';

export const createTables = async () => {
    try {
        const values = await Promise.all([
            await RolesTable.sync(),
            await UsersTable.sync(),
            await UserRolTable.sync(),
            await ClientsTable.sync(),
            await ModulsTable.sync(),
            await PermissionsTable.sync(),
            await createRoles(),
            await createModuls(),
        ]);

        UsersTable.belongsToMany(RolesTable, { through: 'UserRolTable' });
        RolesTable.belongsToMany(UsersTable, { through: 'UserRolTable' });

        // Modelo UsersTable
        UsersTable.hasMany(UserRolTable, { foreignKey: 'user' });

        // Modelo UserRolTable
        UserRolTable.belongsTo(UsersTable, { foreignKey: 'user' });
        UserRolTable.belongsTo(RolesTable, { foreignKey: 'rol' });
 
        // Modelo RolsTable
        RolesTable.hasMany(UserRolTable, { foreignKey: 'rol' });
        RolesTable.hasMany(PermissionsTable, { foreignKey: 'rolid' });
 
        // Modelo PermissionsTable
        PermissionsTable.belongsTo(ModulsTable, {foreignKey: 'modulid',});

        await db.sync()
            .then(() => {
                console.log('Tablas sincronizadas.');
        });

        console.log('Tables created:' + values);
    } catch (error) {
        console.error(error);
    }
}

export const createRoles = async () => {
    try {
        const count = await RolesTable.count();
        if (count > 0) return;

        //modificar antes de subir a produccion
        const values = await Promise.all([
            new RolesTable({ name: 'Administrador', description: 'Control total del sistema', status: 1 }).save(),
            new RolesTable({ name: 'Cliente', description: 'Acceso como cliente a los modulos seleccionados', status: 1 }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

export const createModuls = async () => {
    try {
        const count = await ModulsTable.count();
        if (count > 0) return;

        //modificar antes de subir a produccion
        const values = await Promise.all([
            new ModulsTable({ name: 'Dashboard', description: 'Inicio del sistema', status: 1 }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}