import express from 'express';
import UserController from './../controllers/UserController';

const router = express.Router();

router.get('/users', UserController.index.bind(UserController));
router.post('/users', UserController.create.bind(UserController));
router.get('/users/:id', UserController.show.bind(UserController));
router.put('/users/:id', UserController.update.bind(UserController));
router.delete('/users/:id', UserController.delete.bind(UserController));

export default router;