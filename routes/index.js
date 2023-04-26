import express from 'express';
import { basketRouter } from './basketRouter.js'
import { brandsRouter } from './brandsRouter.js'
import { categoriesRouter } from './categoriesRouter.js'
import { productRouter } from './productRouter.js'
import { userRouter } from './userRouter.js'

const rootRouter = express();

rootRouter.use('/user', userRouter);
rootRouter.use('/basket', basketRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/brand', brandsRouter);
rootRouter.use('/categories', categoriesRouter);

export { rootRouter };