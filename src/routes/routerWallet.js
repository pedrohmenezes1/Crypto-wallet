import { Router } from 'express';
import ControllerWallet from '../app/controllers/controllerWallet';

const routerWallet = Router();

routerWallet.get('/wallet', ControllerWallet.listWallet);

routerWallet.post('/wallet', ControllerWallet.createWallet);

routerWallet.post('/wallet/:wallet_address/coin', ControllerWallet.createCoin);

routerWallet.post(
  '/wallet/:wallet_address/:coin_address/transaction',
  ControllerWallet.createTransactions
);

/* routerWallet.put('/wallet/:address', ControllerWallet.addCoins); */

routerWallet.get('/wallet/:address', ControllerWallet.listOneWallet);

routerWallet.delete('/wallet/:address', ControllerWallet.deleteOneWallet);

export default routerWallet;
