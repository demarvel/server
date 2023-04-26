import express from 'express';
import { brandsController } from '../controllers/brandsController.js'

const brandsRouter = express();

brandsRouter.get('/', brandsController.getAll)

brandsRouter.post('/', brandsController.create)

export { brandsRouter };