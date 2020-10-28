import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';

import OrphanagesPendingController from './app/controllers/OrphanagesPendingController';
import OrphanagesApprovesController from './app/controllers/OrphanagesApprovesController';

import OrphanagesController from './app/controllers/OrphanagesController';
import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import SendForgotEmailController from './app/controllers/SendForgotEmailController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages-pending', OrphanagesPendingController.index);
routes.get('/orphanages-approves', OrphanagesApprovesController.index);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/session', SessionController.create);
routes.post('/forgot-password', SendForgotEmailController.create);

routes.use(authMiddleware);
routes.post('/user', UsersController.create);
routes.put('/user', UsersController.update);

routes.put(
  '/orphanages/:id',
  upload.array('images'),
  OrphanagesController.update,
);
routes.delete('/orphanages/:id', OrphanagesController.delete);

export default routes;
