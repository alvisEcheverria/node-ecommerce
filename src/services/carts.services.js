const { Carts, ProductsInCarts, Products, Categories } = require("../models");

class CartsServices {
    static async create (addProduct){
        try {
            const { productId, quantity, userId } = addProduct;
            const priceProduct = await Products.findByPk(productId);

            const clientCart = await Carts.findOne({ where: { userId}});
            if(!clientCart) await Carts.create({userId});
            const searchCartId = await Carts.findOne({where: { userId}})

            const { id } = searchCartId ;
            const productInCart = await ProductsInCarts.findOne({where: {productId}});
            if(!productInCart) await ProductsInCarts.create({cartId: id, productId, quantity, price: priceProduct.price});
            
            const allProductWithPrice = await Carts.findOne({
                where: { userId },
                include: {
                            model: ProductsInCarts,
                            as: 'productsInCart',
                            include: {
                                model: Products,
                                as: 'products'
                            }
                        }
            });

            let totalPrice = 0;

            allProductWithPrice.productsInCart.forEach(product =>{
                totalPrice += product.price * product.quantity
            })

            await Carts.update({totalPrice}, {
                where: { id }
            });

        } catch (error) {
            throw error;
        }
    }

    static async gettingCart(userId){
        const result = await Carts.findOne({
            where: { userId },
            attributes: {
                exclude: ['id', 'user_id']
            },
            include: {
                model: ProductsInCarts,
                as: 'productsInCart',
                attributes: ['id', 'cartId', 'productId', 'quantity', 'status'],
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
            const { id, newQuantity } = newData;
            const cartId = await Carts.findOne({
                where: { userId }
            });
            const result = await ProductsInCarts.update({quantity: newQuantity}, {
                where: { productId: [id], cartId: [cartId.id]}
            });

            const allProductWithPrice = await Carts.findOne({
                where: { userId },
                include: {
                            model: ProductsInCarts,
                            as: 'productsInCart',
                            include: {
                                model: Products,
                                as: 'products'
                            }
                        }
            });

            let totalPrice = 0;

            allProductWithPrice.productsInCart.forEach(product =>{
                totalPrice += product.price * product.quantity
            });

            await Carts.update({totalPrice}, {
                where: { id: cartId.id }
            });

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

            const allProductWithPrice = await Carts.findOne({
                where: { userId },
                include: {
                            model: ProductsInCarts,
                            as: 'productsInCart',
                            include: {
                                model: Products,
                                as: 'products'
                            }
                        }
            });

            let totalPrice = 0;

            allProductWithPrice.productsInCart.forEach(product =>{
                totalPrice += product.price * product.quantity
            });

            await Carts.update({totalPrice}, {
                where: { id: cartId.id }
            });

            return result;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartsServices;