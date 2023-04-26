import { Categories } from '../models/models.js'

class CategoriesController {
    /** Создание категории. */
    async create(req, res) {
        const { name } = req.body;
        const categories = await Categories.create({ name });
        return res.json(categories);
    }

    /** Получение всех категорий. */
    async getAll(req, res) {
        const categories = await Categories.findAll();
        return res.json(categories);
    }
}

const categoriesController = new CategoriesController()
export { categoriesController };