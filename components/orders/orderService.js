const { models } = require('../../models');
const {Op, literal, fn, col} = require('sequelize');
const {formatDate, formatPrice} = require('./orderHelper');
exports.listOrders = async (condition) => {
    try {
        const option = {
            subQuery: false,
            include: [{
                model: models.users,
                as: 'user',
                attributes: ['firstname', 'lastname', 'phone']
            }],
            where: {},
            raw: true
        }
        if (condition) {
            const page = condition.page || 1;
            const limit = parseInt(condition.limit) || 5;
    
            option.offset = (page - 1) * limit;
            option.limit = limit;
    
            if (condition.search_name) {
                option.where = {
                    ...option.where,
                    [Op.or]: [{
                        '$user.lastname$': {
                            [Op.substring]: '%' + condition.search_name + '%',
                        }
                    }, {
                        '$user.firstname$': {
                            [Op.substring]: '%' + condition.search_name + '%',
                        }
                    }]
                }
            }
            if (condition.sort) {
                if (condition.sort === "price_asc") {
                    option.order = [
                        ["total_price", "ASC"],
                    ];
                }
                else if (condition.sort === "price_desc") {
                    option.order = [
                        ["total_price", "DESC"],
                    ];
                }
                else if (condition.sort === "date_asc") {
                    option.order = [
                        ["create_date", "ASC"],
                    ];
                }
                else if (condition.sort === "date_desc") {
                    option.order = [
                        ["create_date", "DESC"],
                    ];
                }
            }
    
            if (condition.type) {
                option.where = {
                    ...option.where,
                    order_status: condition.type
                }
            }
        }
        else {
            option.limit = 5;
            option.offset = 0;
        }
        const ordersRowAndCount = await models.orders.findAndCountAll(option);
        if (ordersRowAndCount) {
            ordersRowAndCount.rows.forEach(order => {
                order.totalString = formatPrice(order.total_price);
                order.createDateFormat = formatDate(order.create_date);
            });
        }
        return ordersRowAndCount;
    }
    catch (error) {
        throw(error);
    }
}

exports.dailyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',
            [fn('sum', col('order_total_price')), 'totalRevenue'],
        ],
        group: ['order_date'],
        order: literal('order_date ASC'),
        raw: true,
    })
}

exports.monthlyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',

            [fn('sum', col('order_total_price')), 'totalRevenue'],
        ],
        group: [literal('MONTH(order_date)', 'month')],
        order: literal('order_date ASC'),
        raw: true,
    })
}

exports.yearlyRevenue = () => {
    return models.orders.findAll({
        attributes: [
            'order_date',
            [fn('sum', col('order_total_price')), 'totalRevenue'],
        ],
        group: [literal('YEAR(order_date)', 'month')],
        order: literal('order_date ASC'),
        raw: true,
    })
}

exports.getTotalDelivery = () => {
    return models.orders.findAll({
        attributes: [
            'order_status',
            [fn('count', col('order_status')), 'total'],
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
                    [fn('count', col('orders.order_id')), 'totalProduct'],
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

exports.getOrdersGroupByStatus = () => {
    return models.orders.findAll({
        attributes: [
            'order_status',
            [fn('count', col('order_status')), 'total'],
        ],
        group: 'order_status',
        raw: true,
    })
}