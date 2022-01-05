import { Router } from 'express';
import routerWallet from './routerWallet';

const apiRoutes = new Router();

apiRoutes.use('/api/v1', routerWallet);

export default apiRoutes;
