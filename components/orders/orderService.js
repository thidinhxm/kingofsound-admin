const { models } = require('../../models');
const sequelize = require('sequelize');

exports.getOrders = () => {
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

exports.dailyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',
            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: ['order_date'],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
}

exports.monthlyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',

            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: [sequelize.literal('MONTH(order_date)', 'month')],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
}

exports.yearlyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',
            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: [sequelize.literal('YEAR(order_date)', 'month')],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
}

exports.getTotalDelivery = () => {
    return models.orders.findAll({
        attributes: [
            'order_status',
            [sequelize.fn('count', sequelize.col('order_status')), 'total'],
        ],
        group: 'order_status',
        raw: true,
    })
}

exports.detailOrder = (id) => {
    return models.orders.findOne({

        where: {
            order_id: id
        },
        include: [
            {
                model: models.detailorders,
                attributes: [
                    'order_id',
                    [sequelize.fn('count', sequelize.col('orders.order_id')), 'totalProduct'],
                ],
                as: 'detailorders',
                required: true,
            },
            {
                model: models.users,
                as: 'user',
                attributes: ['firstname', 'lastname']
            }],
        group: ['orders.order_id',],
        raw: true
    })
}

exports.updateOrder = (id, order) => {
    return models.orders.update(order, {
        where: {
            order_id: id
        }
    })
}