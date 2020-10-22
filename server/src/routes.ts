import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';

import OrphanagesController from './app/controllers/OrphanagesController';
import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.put(
  '/orphanages/:id',
  upload.array('images'),
  OrphanagesController.update,
);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/session', SessionController.create);

routes.use(authMiddleware);
routes.post('/user', UsersController.create);
routes.put('/user', UsersController.update);

export default routes;
