import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

/** Пользователь. */
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER"},
});

/** Корзина. */
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/** Связь корзины с продуктами. */
const BasketProducts = sequelize.define('basket_products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/** Товар. */
const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
    image: {  type: DataTypes.STRING },
    price: {  type: DataTypes.INTEGER, allowNull: false },
});

/** Категории товаров. */
const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

/** Брэнд товара. */
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const CategoriesBrand = sequelize.define('categories_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/** Связь один к одному User|Basket. */
User.hasOne(Basket);
Basket.belongsTo(User);
/** Связь один ко многим Basket|Basket_Products. */
Basket.hasMany(BasketProducts);
BasketProducts.belongsTo(Basket);
/** Связь один ко многим Categories|Products. */
Categories.hasMany(Products);
Products.belongsTo(Categories);
/** Связь один ко многим Brand|Products. */
Brand.hasMany(Products);
Products.belongsTo(Brand);
/** Связь один ко многим Products|Basket_Products. */
Products.hasMany(BasketProducts);
BasketProducts.belongsTo(Products);
/** Связь многие ко многим Categories|Brand. */
Categories.belongsToMany(Brand, { through: CategoriesBrand});
Brand.belongsToMany(Categories, { through: CategoriesBrand});

export { Basket, BasketProducts, Brand, Categories, CategoriesBrand, Products, User };