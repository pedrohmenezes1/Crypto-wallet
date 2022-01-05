import { Router } from 'express';
import routerWallet from './routerWallet';

const apiRoutes = new Router();

/* apiRoutes.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Orm-Sequelize' });
}); */

apiRoutes.use('/api/v1', routerWallet);

export default apiRoutes;
