import { Router } from "express";
const router = Router();

import * as clientsCtrl from '../controllers/clients.controller';
import { authJwt } from '../middlewares';
import { isPermisosModul } from "../middlewares/authJwt";

router.get('/', [authJwt.verifyToken, isPermisosModul("Clientes")], clientsCtrl.getClients);
router.post('/', [authJwt.verifyToken, isPermisosModul("Clientes")], clientsCtrl.createClient);
router.get('/:clientId', [authJwt.verifyToken, isPermisosModul("Clientes")], clientsCtrl.getClientById);
router.put('/:clientId', [authJwt.verifyToken, isPermisosModul("Clientes")], clientsCtrl.updateClientById);
router.delete('/:clientId', [authJwt.verifyToken, isPermisosModul("Clientes")], clientsCtrl.deleteClientById);

export default router;