import express from 'express';
import { userController } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const userRouter = express();

/** Регистрация пользователя. */
userRouter.post('/registration', userController.registration)
/** Вход пользователя. */
userRouter.post('/login', userController.login)
/** Проверка пользователя. */
userRouter.get('/auth', authMiddleware, userController.check);

export { userRouter };