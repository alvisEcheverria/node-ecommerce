const { CartsServices } = require('../services');
const userToken = require('../utils/dataToken');
require('dotenv').config();

const addProductToCart = async (req, res, next)=>{
    try {
        const addProduct = req.body;
        const bearerToken = req.headers.authorization;
        await CartsServices.create(({...addProduct, userId: userToken(bearerToken).id}));
        res.status(201).json({ message: 'Se agrego el producto al carrito'});

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Faltan datos'
        });
    }
};

const getCart = async (req, res, next) =>{
    try {
        const bearerToken = req.headers.authorization;
        const result =  await CartsServices.gettingCart(userToken(bearerToken).id)
        
        if(result){
            res.json({
                status: 'success',
                data: {
                    cart: result
                }
        })
        }else{
            res.json({
                status: 'success',
                data: {
                    cart: []
                }
    })
        }
        
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'No se pudo obtener el carrito'
        });
    }
}

const updateCart = async (req, res, next) =>{
    try {
        const newData = req.body;
        const bearerToken = req.headers.authorization;
        const result = await CartsServices.update(userToken(bearerToken).id, newData)
        res.json(result);

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'El carrito no se pudo actualizar'
        });
    }
}

const delProductInCart = async (req, res, next) =>{
    try {
        const { productId } = req.params;
        const bearerToken = req.headers.authorization;
        const result = await CartsServices.delete(userToken(bearerToken).id, productId);
        res.json(result);

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'El producto no se pudo eliminar'
        });
    }
}

const emptyCart = async (req, res, next) =>{
    try {
        const bearerToken = req.headers.authorization;
        const result = await CartsServices.deleteProductsInCart(userToken(bearerToken).id);
        res.json(result);

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'No se pudo vaciar el carrito'
        });
    }
}

module.exports = {
    addProductToCart,
    getCart,
    updateCart,
    delProductInCart,
    emptyCart
}