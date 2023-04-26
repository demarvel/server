import { Brand } from '../models/models.js';
import { ApiError } from '../error/ApiError.js'

class BrandsController {
    /** Создать брэнд. */
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name })
        return res.json(brand)
    }
    /** Получение всех брэндов. */
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}
const brandsController = new BrandsController()
export { brandsController };