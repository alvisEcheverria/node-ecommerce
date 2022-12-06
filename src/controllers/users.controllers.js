const { UsersServices } = require('../services');
const bcrypt = require('bcrypt');
const userToken = require('../utils/dataToken');
const transporter = require('../utils/mailer');

const userRegister = async (req, res, next) =>{
    try {
        const newUser = req.body;
        if(newUser.phone.length >= 10 && newUser.password.length >= 8){
            const result = await UsersServices.create(newUser);
            res.status(201).json(result.message);

            transporter.sendMail({
                from: '<alvis.cm@gmail.com>',
                to: result.result.email,
                subject: 'Bienvenido a la tienda con las mejores rebajas del momento',
                text: `Hola, ${result.result.firstName} ${result.result.lastName}. En este Black Friday, tenemos las mejores rebajas. ¡Nos volvimos locos!`,
                html: `<h1>Hola, ${result.result.firstName} ${result.result.lastName}<h1> </br> <h2>En este Black Friday, tenemos las mejores rebajas. ¡Nos volvimos locos!</h2>`
            });

        }else if(newUser.phone.length < 10){
            res.status(400).json({ message: 'El número de telefono debe tener un minimo de 10 digitos'});
        }else if(newUser.password.length < 8){
            res.status(400).json({ message: 'La contraseña debe tener un minimo de 8 digitos'})
        }

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Email o número de teléfono ya registrados, o faltan datos por llenar'
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
        if(password.length >= 8){
            const result = await UsersServices.update(updateData, userToken(bearerToken).id, password);
            if(result.isEqual){
                res.status(400).json(result.message)
            }else{
                res.json(result.message);
            }  
        }
        else{
            res.status(400).json({ message: 'La contraseña debe tener un minimo de 8 digitos' })
        }
        
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