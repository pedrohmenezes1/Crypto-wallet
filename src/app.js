import express from 'express';
import apiRoutes from './routes/routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(apiRoutes);
  }
}

export default new App().server;
