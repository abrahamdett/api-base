import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import { createTables, createRoles  } from './libs/initialSetup';

import clientsRoutes from './routes/clientes.routes';
import authRoutes from './routes/auth.routes';

const app = express();

//creamos las tablas
console.log('Creando tablas, configuramos relaciones de las mismas, creamos los roles, modulos y permisos por defecto');
createTables();

app.set('pkg', pkg);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientsRoutes);

export default app;