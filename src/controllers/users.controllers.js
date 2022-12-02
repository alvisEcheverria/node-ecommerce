const { UsersServices } = require('../services');
const bcrypt = require('bcrypt');
const userToken = require('../utils/dataToken');
const transporter = require('../utils/mailer');

const userRegister = async (req, res, next) =>{
    try {
        const newUser = req.body;
        const result = await UsersServices.create(newUser);
        res.status(201).json(result);

        transporter.sendMail({
            from: '<alvis.cm@gmail.com>',
            to: result.email,
            subject: 'Bienvenido a la tienda con las mejores rebajas del momento',
            text: `Hola, ${result.firstName} ${result.lastName}. En este Black Friday, tenemos las mejores rebajas. ¡Nos volvimos locos!`,
            html: `<h1>Hola, ${result.firstName} ${result.lastName}<h1> </br> <h2>En este Black Friday, tenemos las mejores rebajas. ¡Nos volvimos locos!</h2>`
        });

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Faltan datos'
        })
    }
}

const getInfoUser = async (req, res, next) =>{
    try {
        const bearerToken = req.headers.authorization;
        const result = await UsersServices.getById(userToken(bearerToken).id);
        res.json(result)
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Algo salió mal'
        })
    }
}

const updateUser = async (req, res, next) =>{
    try {
        const { password } = req.body;
        const bearerToken = req.headers.authorization;
        let updateData = { password }
        const hash = bcrypt.hashSync(updateData.password, 10)
        updateData.password = hash;
        const result = await UsersServices.update(updateData, userToken(bearerToken).id);
        res.json(result);
    } catch (error) {
        next({
            message: "No se pudo actualizar, tal vez no tengas los permisos.",
            status: 400,
            errorContent: error
        });
    }
};

module.exports = {
    userRegister,
    getInfoUser,
    updateUser
}