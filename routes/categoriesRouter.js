import express from 'express';
import { categoriesController } from '../controllers/categoriesController.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'

const categoriesRouter = express();

categoriesRouter.get('/', checkRoleMiddleware("ADMIN"), categoriesController.getAll)
categoriesRouter.post('/', categoriesController.create)

export { categoriesRouter };