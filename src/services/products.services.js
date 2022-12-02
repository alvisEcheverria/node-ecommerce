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

    static async getAll (){
        try {
            const result = await Products.findAll({
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

            const availableProducts = result.filter(products => products.quantity > 0);
            return availableProducts;

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