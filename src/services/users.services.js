const { Users } = require('../models');

class UsersServices {
    static async create(newUser){
        try {
            const result = await Users.create(newUser)
            return result;
        } catch (error) {
            throw error
        }
    }

    static async getById(userId){
        try {
            const result = await Users.findByPk(userId, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
            });
            return result;
        } catch (error) {
            throw error
        }
    }

    static async update(updateData, userId){
        try {
            const result = await Users.update(updateData, {
                where: { id: userId }
            });
            return result;
        } catch (error) {
            throw error
        }
    }

}

module.exports = UsersServices;