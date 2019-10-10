import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import autorize from './app/meddlewares/autorize';
import UserController from './app/controllers/UserController';
import SessionContoller from './app/controllers/SessionContoller';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const upload = multer(multerConfig);
const router = new Router();

router.get('/users', autorize, ProviderController.index);

router.post('/users', autorize, UserController.store);

router.put('/users', autorize, UserController.update);

router.get('/appointments', autorize, AppointmentController.index);

router.post('/appointments', autorize, AppointmentController.store);

router.delete('/appointments/:id', autorize, AppointmentController.delete);

router.get('/schedules', autorize, ScheduleController.index);

router.get(
  '/providers/:providerId/available',
  autorize,
  AvailableController.index
);

router.get('/notifications', autorize, NotificationController.index);

router.put('/notifications/:id', autorize, NotificationController.update);

router.post('/session', SessionContoller.store);

router.post('/files', upload.single('file'), FileController.store);

export default router;
