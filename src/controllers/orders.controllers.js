const { OrdersServices } = require('../services');
const transporter = require('../utils/mailer');
const userToken = require('../utils/dataToken');
require('dotenv').config();

const genOrder = async (req, res, next) =>{
    try {
        const bearerToken = req.headers.authorization;
        const result = await OrdersServices.generateOrder(userToken(bearerToken).id);
        res.status(201).json(result);

        transporter.sendMail({
            from: '<alvis.cm@gmail.com>',
            to: userToken(bearerToken).email,
            subject: 'Gracias por tu compra',
            text: 'Nos complace anunciarte que tu compra ha sido un exito, gracias por preferirnos',
            html: `<h1>Nos complace anunciarte que tu compra ha sido un exito, gracias por preferirnos</h1>`
        });

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Faltan datos'
        });
    }
};

const getUserOrders = async (req, res, next) =>{
    try {

        const bearerToken = req.headers.authorization;
        const result = await OrdersServices.getOrders(userToken(bearerToken).id);
        res.json({
            status: 'success',
            data: {
                orders: 
                result
            }
        });

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'No se pudieron obtener las ordenes'
        });
    }
};

module.exports = {
    genOrder,
    getUserOrders 
}
