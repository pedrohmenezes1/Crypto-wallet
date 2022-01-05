import { Router } from 'express';
import ControllerWallet from '../app/controllers/ControllerWallet';

const routerWallet = Router();

routerWallet.get('/wallet/', ControllerWallet.-);
routerWallet.post('/wallet/', ControllerWallet.-);
routerWallet.put('/wallet/', ControllerWallet.-);
routerWallet.delete('/wallet/', ControllerWallet.-);

export default routerWallet;
