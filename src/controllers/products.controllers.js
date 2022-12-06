const { ProductsServices } = require('../services');
const userToken = require('../utils/dataToken');
require('dotenv').config();

const createProduct = async (req, res, next)=>{
    try {
        const newProduct = req.body;
        const bearerToken = req.headers.authorization;
        const result = await ProductsServices.create(({...newProduct, userId: userToken(bearerToken).id}));
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Faltan datos'
        });
    }
};

const getAllProducts = async (req, res, next)=>{
    try {

        const offset = Number(req.query.offset ?? 0);
        const limit = Number(req.query.limit ?? 10);

        const result = await ProductsServices.getAll(offset, limit);

        const { count, rows } = result;
        
        res.json({
            status: 'success',
            count,
            next: `${process.env.HOST}/api/v1${req.path}?offset=${
                offset + limit
              }&limit=${limit}`,
            previous: 
            offset >= limit? `${process.env.HOST}/api/v1${req.path}?offset=${
                offset - limit
            }&limit=${limit}`
            : 
            null,
            data: {
                products: 
                rows
            }
        });
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'No se pudieron obtener los productos'
        });
    }
};

const getProductById = async (req, res, next) =>{
    try {
        const { productId } = req.params;
        const result = await ProductsServices.getById(productId)
        res.json(result)
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'No se pudo obtener el producto'
        });
    }
};

const updateProduct = async (req, res, next) =>{
    try {
        const { productId } = req.params;
        const { title, description, price, quantity } = req.body;
        const result = await ProductsServices.update({title, description, price, quantity}, productId);
        res.json(result);
    } catch (error) {
        next({
            message: "No se pudo actualizar, tal vez no tengas los permisos.",
            status: 400,
            errorContent: error
        });
    }
};

const deleteProduct = async (req, res, next) =>{
    try {
        const { productId } = req.params;
        const result = await ProductsServices.delete(productId)
        res.json(result);
    } catch (error) {
        next({
            message: "No se pudo eliminar, tal vez no tengas los permisos.",
            status: 400,
            errorContent: error
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}