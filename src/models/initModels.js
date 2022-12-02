const { Users, Categories, Products, Carts, Orders, ProductsInCarts, ProductsInOrders} = require('./index');

const initModels = () =>{

    Products.belongsTo(Users, {as: 'user', foreignKey: 'user_id'} );
    Users.hasMany(Products, {as: 'products', foreignKey: 'user_id'});

    Carts.belongsTo(Users, {as: 'user', foreignKey: 'user_id'});
    Users.hasOne(Carts, {as: 'cart', foreignKey: 'user_id'})

    Orders.belongsTo(Users, {as: 'user', foreignKey: 'user_id'});
    Users.hasMany(Orders, {as: 'order', foreignKey: 'user_id'});

    Products.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
    Categories.hasMany(Products, {as: 'products', foreignKey: 'category_id'});

    ProductsInCarts.belongsTo(Carts, {as: 'cart', foreignKey: 'cart_id'});
    Carts.hasMany(ProductsInCarts, {as: 'productsInCart', foreignKey: 'cart_id'});
    
    ProductsInCarts.belongsTo(Products, {as: 'products', foreignKey: 'product_id'});
    Products.hasMany(ProductsInCarts, {as: 'productsInCart', foreignKey: 'product_id'});
    
    ProductsInOrders.belongsTo(Orders, {as: 'order', foreignKey: 'order_id'});
    Orders.hasMany(ProductsInOrders, {as: 'productsInOrder', foreignKey: 'order_id'})

    ProductsInOrders.belongsTo(Products, {as: 'products', foreignKey: 'product_id'})
    Products.hasMany(ProductsInOrders, {as: 'productsInOrder', foreignKey: 'product_id'})
    
};

module.exports = initModels;