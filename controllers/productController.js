import { Products } from '../models/models.js'
import { v4 } from 'uuid'
import { resolve, dirname } from 'path'
import { ApiError } from '../error/ApiError.js'

class ProductController {
    /** Создать продукт. */
    async create(req, res, next) {
        try {
            const { name, description, price, categoryId, brandId} = req.body;
            const { image } = req.files;
            let fileName = v4() + '.jpg';
            image.mv(resolve(resolve(dirname('')), 'static', fileName))
            const product = await Products.create({ name, description, price, categoryId, brandId, image: fileName })
            return res.json(product);
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    /** Получить все продукты. */
    async getAll(req, res) {
        let { categoryId, brandId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let products;
        if (!categoryId && !brandId) {
            products = await Products.findAndCountAll()
        }
        if (!categoryId && brandId) {
            products = await Products.findAndCountAll({ where: {brandId}, limit, offset})
        }
        if (categoryId && !brandId) {
            products = await Products.findAndCountAll({ where: {categoryId}, limit, offset})
        }
        if (categoryId && brandId) {
            products = await Products.findAndCountAll({ where: {categoryId, brandId}, limit, offset})
        }
        return res.json(products);
    }

    /** Получить конкретный продукт. */
    async getOne(req, res) {
        const { id } = req.params
        const product = await Products.findOne({ where: {id}});
        return res.json(product)
    }

}

const productController = new ProductController()
export { productController };