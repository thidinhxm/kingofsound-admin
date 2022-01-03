const orderService = require('./orderService');
const { models } = require("../../models");
const { Op } = require('sequelize')
const moment = require('moment');
const active = { order: true };


exports.getOders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrders();
        res.render('../components/orders/orderViews/orders', { active: active, orders: orders });
    }
    catch (err) {
        next(err);
    }
}
exports.edit = async (req, res, next) => {
    try {
        const currentOrder = await orderService.detailOrder(req.params.id);
        const order = currentOrder[0]
        console.log(currentOrder[0])
        res.render('../components/orders/orderViews/order-edit', {order,active})
    }
    catch (error) {
        console.error(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        console.log(req.body)
        const currentOrder = {
            order_status: req.body.order_status,
            payment_status: req.body.payment_status,

        }
        await models.orders.update(currentOrder,{
            where:{
                order_id: req.body.order_id,
            }
        })
        console.log(currentOrder)
       res.redirect('/orders')
    }
    catch (error) {
        console.error(error)
    }
}


// dailyRevenue()
