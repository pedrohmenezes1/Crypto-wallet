import { Router } from 'express';
import ControllerWallet from '../app/controllers/controllerWallet';

const routerWallet = Router();

routerWallet.get('/wallet', ControllerWallet.listWallet);

routerWallet.post('/wallet', ControllerWallet.createWallet);

export default routerWallet;
