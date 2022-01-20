const { models } = require('../../models');
const {Op, literal, fn, col, where} = require('sequelize');
const {formatDate, formatPrice} = require('./orderHelper');
const categoryService = require('../categories/categoryService');
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

exports.getOrder = (id) => {
    return models.orders.findOne({
        where: {
            order_id: id
        },
        include: [
            {
                model: models.users,
                as: 'user',
                attributes: ['firstname', 'lastname']
            }],
        raw: true
    })
}


exports.getDetailOrders = (id) => {
    return models.detailorders.findAll({
        where: {
            order_id: id
        },
        include: [{
            model: models.products,
            attributes: ['product_name', 'price'],
            as: 'product',
            include: [{
                model: models.images,
                as: 'images',
                where: {
                    image_stt: 1
                },
            }]
        }],
        raw: true
    })
}

exports.getQtySaleOfCategoryByYear = async (year) => {
    try {
        const qtySaleOfCategoryMonths = await models.orders.findAll({
            subQuery: false,
            attributes: [
                [fn('MONTH', col('create_date')), 'month'],
                [fn('YEAR', col('create_date')), 'year'],
                [fn('sum', col('detailorders.quantity')), 'total'],
                'detailorders.product.category.category_id',
                'detailorders.product.category.category_name',
            ],
            include: [{
                model: models.detailorders,
                as: 'detailorders',
                attributes: [],
                include: [{
                    model: models.products,
                    as: 'product',
                    attributes: [],
                    include: [{
                        model: models.categories,
                        as: 'category',
                        attributes:[],
                    }]
                }]
            }],
            where: {
                query: where(fn('YEAR', col('create_date')), year),
                payment_status: 'Đã thanh toán',
            },
            group: [
                'detailorders.product.category.category_id',
                'detailorders.product.category.category_name',
                [literal('MONTH(create_date)', 'month')], 
                [literal('YEAR(create_date)', 'year')]
            ],
            raw: true,
        })

        const subCategories = await categoryService.listAllSubCategories();

        const result = [];
        subCategories.forEach(subCategory => {
            const subCategoryObj = {
                category_id: subCategory.category_id,
                category_name: subCategory.category_name,
                quantityList: new Array(12).fill(0),
            }
            for (let i = 1; i <= 12; i++) {
                qtySaleOfCategoryMonths.forEach(qtySaleOfCategoryMonth => {
                    if (qtySaleOfCategoryMonth.category_id === subCategory.category_id && qtySaleOfCategoryMonth.month === i) {
                        subCategoryObj.quantityList[i - 1] = parseInt(qtySaleOfCategoryMonth.total);
                    }
                    
                })
            }
            result.push(subCategoryObj)
        })
        return result;
        
    } 
    catch(err) {
        throw(err);
    }
}