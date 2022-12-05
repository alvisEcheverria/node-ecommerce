const { ProductsInCarts, Products } = require("../models");

const totalPrice = async (Carts, userId, cartId) =>{
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
        where: { id: cartId }
    });
}

module.exports = totalPrice;