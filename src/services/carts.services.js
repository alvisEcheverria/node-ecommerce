const { Carts, ProductsInCarts, Products, Categories } = require("../models");
const subTotal = require("../utils/subTotal");
const totalPrice = require('../utils/totalPrice');

class CartsServices {
    static async create (addProduct){
        try {
            const { productId, quantity, userId } = addProduct;
            const findProduct = await Products.findByPk(productId);

            const clientCart = await Carts.findOne({ where: { userId}});
            if(!clientCart) await Carts.create({userId});
            const searchCartId = await Carts.findOne({where: { userId}})

            const { id } = searchCartId ;
            const productInCart = await ProductsInCarts.findOne({where: {productId: [productId], cartId: [id]}});
            if(!productInCart) await ProductsInCarts.create({cartId: id, productId, quantity, price: findProduct.price, subTotal: 0});
           
            await subTotal(productId, id);

            await totalPrice(Carts, userId, id);

            if(!productInCart) return { message: 'Se agrego el producto al carrito'};
            else return { message: 'El producto ya fue agregado al carrito'}

        } catch (error) {
            throw error;
        }
    }

    static async gettingCart(userId){
        const result = await Carts.findOne({
            where: { userId },
            attributes: {
                exclude: ['user_id']
            },
            include: {
                model: ProductsInCarts,
                as: 'productsInCart',
                attributes: ['id', 'cartId', 'productId', 'quantity', 'subTotal', 'status'],
                include: {
                    model: Products,
                    as: 'products',
                    attributes: ['id', 'title', 'description', 'price', 'productImgs'],
                    include: {
                        model: Categories,
                        as: 'category',
                        attributes: {
                            exclude: ['status']
                        }
                    }
                }
            }
        });
        return result;   
    }

    static async update(userId, newData){
        try {
            const { productId, newQuantity } = newData;
            const cartId = await Carts.findOne({
                where: { userId }
            });
            const result = await ProductsInCarts.update({quantity: newQuantity}, {
                where: { productId: [productId], cartId: [cartId.id]}
            });

            await subTotal(productId, cartId.id);

            await totalPrice(Carts, userId, cartId.id);

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(userId, productId){
        try {
            const cartId = await Carts.findOne({
                where: { userId }
            });
            const result = await ProductsInCarts.destroy({
                where: { cartId: [cartId.id], productId: [productId] }
            });

            await totalPrice(Carts, userId, cartId.id);

            return result;

        } catch (error) {
            throw error;
        }
    }

    static async delAllProductsInCart(userId){
        try {
            const findCart = await Carts.findOne({
                where: { userId }
            }); 
            const result = await ProductsInCarts.destroy({
                where: { cartId: findCart.id }
            });
            
            await totalPrice(Carts, userId, findCart.id);

            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = CartsServices;