const { models } = require('../../models');
const sequelize = require('sequelize');

exports.getOrders = (req, res) => {
    return models.orders.findAll({
        attribute: [],
        include: [{
            model: models.users,
            as: 'user',
            attributes: ['firstname', 'lastname', 'email', 'address', 'phone']
        }],
        raw: true
    });
}

exports.getTop10 =  () => {
    const listTotalOder =  models.detailorders.findAll({
        attributes: [
            'product_id',
            [sequelize.fn('sum',sequelize.col('detailorders.quantity')), 'total_quantity'],
            'product.product_name'
        ],
         include: [{
            model: models.products,
            as: 'product',
            attributes: ['product_name'],
        }],
        group: ['product_id'],
        raw: true,
        limit: 10,
        order: sequelize.literal('total_quantity DESC'),

    })
    return listTotalOder;

}