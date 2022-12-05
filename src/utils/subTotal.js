const { ProductsInCarts } = require("../models");

const subTotal = async (productId, cartId) =>{
    
            const inCart = await ProductsInCarts.findOne({where: {productId: [productId], cartId: [cartId]}});

            const subTotal = inCart.price * inCart.quantity;

            await ProductsInCarts.update({subTotal}, {where: {productId: [productId], cartId: [cartId]}})
};

module.exports = subTotal;