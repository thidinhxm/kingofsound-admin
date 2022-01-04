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

exports.getTop10 = () => {
    const listTotalOder = models.detailorders.findAll({
        attributes: [
            'product_id',
            [sequelize.fn('sum', sequelize.col('detailorders.quantity')), 'total_quantity'],
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

exports.dailyRevenue = () => {
    const dailyRevenue = models.orders.findAll({
        attributes: [
            'order_date',
            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: ['order_date'],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
    console.log(dailyRevenue)
    return dailyRevenue
}

exports.monthlyRevenue = () => {
    const monthlyRevenue = models.orders.findAll({
        attributes: [
            'order_date',

            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: [sequelize.literal('MONTH(order_date)', 'month')],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
    console.log(monthlyRevenue)
    return monthlyRevenue
}

exports.yearlyRevenue = () => {
    const yearlyRevenue = models.orders.findAll({
        attributes: [
            'order_date',
            [sequelize.fn('sum', sequelize.col('order_total_price')), 'totalRevenue'],
        ],
        group: [sequelize.literal('YEAR(order_date)', 'month')],
        order: sequelize.literal('order_date ASC'),
        raw: true,
    })
    console.log(yearlyRevenue)
    return yearlyRevenue
}

exports.getTotalDelivery = () => {
    const statisticDelivery = models.orders.findAll({
        attributes: [
            'order_status',
            [sequelize.fn('count', sequelize.col('order_status')), 'total'],
        ],
        group: 'order_status',
        raw: true,
    })
    console.log(statisticDelivery)
    return statisticDelivery;
}
// getTotalDelivery()

exports.detailOrder = (id) => {
    try {
        const detailOrder = models.orders.findAll({
            attribute: [
                // 'order_id',
            ],
            where: {
                order_id: id
            },
            include: [{
                model: models.detailorders,
                as: 'detailorders',
                attributes: [
                    [sequelize.fn('count', sequelize.col('orders.order_id')), 'totalProduct'],

                ],
                required: true,
                include: [{
                    model: models.products,
                    as: 'product',
                    attributes: ['product_name'],
                    // required: true,
                }]

            },

            {

                model: models.users,
                as: 'user',
                attributes: ['firstname','lastname']
            }
            ],

            group: 'orders.order_id',
            raw: true
        })
        return detailOrder;
        // console.log(detailOrder)
    }
    catch (e) { console.log(e) }

}

