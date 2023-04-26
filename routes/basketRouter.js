import express from 'express';
import { basketController } from '../controllers/basketController.js'

const basketRouter = express();

basketRouter.get('/', basketController.getAll);
basketRouter.post('/', basketController.create)

export { basketRouter };