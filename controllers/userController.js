import { ApiError } from "../error/ApiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { User, Basket } from '../models/models.js';
import { config } from 'dotenv'

config();
const secret = process.env.SECRET_KEY;

class UserController {
    
    /** Регистрация пользователя. */
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({ where: {email}})
        if(candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword });
        const basket = await Basket.create({userId: user.id})
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role }, 
            secret, 
            { expiresIn: '24h'}
        );
        return res.json({token})
    }

    /** Аутентификация пользователя. */
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }})
        if(!user) {
            return next(ApiError.badRequest("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest("Указан неверный пароль"))
        }
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role }, 
            secret, 
            { expiresIn: '24h'}
        );
        return res.json({token})
    }

    /** Проверка пользователя. */
    async check(req, res, next) {
        const token = jwt.sign(
            {id: req.user.id, email: req.user.email, role: req.user.role }, 
            secret, 
            { expiresIn: '24h'}
        );
        return res.json({token})
    }
}

const userController = new UserController();
export { userController };