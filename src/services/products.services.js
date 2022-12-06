const { Products, Categories, Users } = require('../models');

class ProductsServices {
    static async create (newProduct){
        try {
            const result = await Products.create(newProduct);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getAll (offset, limit){
        try {
            
            await Products.update({status: 'inactive'},{
                where: { quantity: 0 }
            });

            const result = await Products.findAndCountAll({
                offset,
                limit,
                where: { status: 'active' },
                attributes: ['id', 'title', 'description', 'price', 'productImgs', 'quantity', 'status', 'categoryId', 'userId'],
                include: [
                {
                    model: Categories,
                    as: 'category'
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
                }
                ]
            });

            return result;

        } catch (error) {
            throw error;
        }
    }

    static async getById(productId){
        try {
            const result = await Products.findByPk(productId, {
                attributes: ['id', 'title', 'description', 'price', 'productImgs', 'quantity', 'status', 'categoryId', 'userId'],
                include: [
                {
                    model: Categories,
                    as: 'category'
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
                }
                ]
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(updateData, productId){
        try {
            const result = await Products.update(updateData, {
                where: { id: productId }
            });
            return result;
        } catch (error) {
            throw error
        }
    }

    static async delete(productId){
        try {
            const result = await Products.destroy({
                where: { id: productId }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductsServices;