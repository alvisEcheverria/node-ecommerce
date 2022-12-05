const { Orders, ProductsInOrders, ProductsInCarts, Carts, Products, Categories } = require("../models");

class OrdersServices {
    static async generateOrder(userId){
        try {
            const clientCart = await Carts.findOne({ where: { userId}});

            if(clientCart.totalPrice > 0) await Orders.create({cartId: clientCart.id, totalPrice: clientCart.totalPrice, userId, status: 'purchased'});

            const findOrder = await Orders.findOne({
                where: { cartId: clientCart.id}
            });

            const findProductInCart = await Carts.findByPk(clientCart.id, {
                include: {
                    model: ProductsInCarts,
                    as: 'productsInCart'
                }
            });

            findProductInCart.productsInCart.forEach( async product => await ProductsInOrders.create({
                    orderId: findOrder.id, 
                    productId: product.productId, 
                    quantity: product.quantity,
                    price: product.price,
                    subTotal: product.subTotal,
                    status: 'purchased'
            }));
            
            await ProductsInCarts.destroy({
                where: { cartId: clientCart.id }
            });

             await Carts.destroy({
                where: { userId }
            }); 
            
            if(clientCart.totalPrice > 0) return { message: 'Compra exitosa'};
            else return { message: 'No hay productos en el carrito'}

        } catch (error) {
            throw error;
        }
    }

    static async getOrders(userId){
        try {
            const result = await Orders.findAll({
                where: { userId },
                attributes: {
                    exclude: ['cartId', 'user_id']
                },
                include: {
                    model: ProductsInOrders,
                    as: 'productsInOrder',
                    attributes: ['id', 'orderId', 'productId', 'quantity', 'price'],
                    include: {
                        model: Products,
                        as: 'products',
                        attributes: ['id', 'title', 'description', 'price', 'productImgs'],
                        include: {
                            model: Categories,
                            as: 'category',
                            attributes: ['id', 'name']
                        }
                    }
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdersServices;