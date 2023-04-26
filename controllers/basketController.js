import { Basket } from '../models/models.js'

class BasketController {
    /** Создание корзины. */
    async create(req, res) {
        const { name } = req.body;
        const basket = await Basket.create({ name });
        return res.json(basket);
    }

    /** Получение всех корзин. */
    async getAll(req, res) {
        const basketsList = await Basket.findAll()
        return res.json(basketsList);
    }
}

const basketController = new BasketController();
export { basketController };