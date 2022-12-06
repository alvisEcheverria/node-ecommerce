const { Users } = require('../models');
const bcrypt = require('bcrypt');

class UsersServices {
    static async create(newUser){
        try {

            const result = await Users.create(newUser)
            return { result, message: 'Usuario exitosamente creado'}

        } catch (error) {
            throw error;
        }
    }

    static async getById(userId){
        try {
            const result = await Users.findByPk(userId, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(updateData, userId, password){
        try {

            const findUser = await Users.findByPk(userId);
            const isEqual = bcrypt.compareSync(password, findUser.password);

            if(isEqual){
                return {isEqual, message: 'La contraseña debe ser diferente a la anterior'};
            }
            else{
                await Users.update(updateData, {
                    where: { id: userId }
                });
                return { message: 'La contraseña se ha actualizado exitosamente'}; 
            }
            
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UsersServices;