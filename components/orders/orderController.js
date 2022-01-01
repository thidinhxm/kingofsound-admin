const orderService = require('./orderService');
const { models } = require("../../models");
const { Op } = require('sequelize')
const moment = require('moment');

exports.getOders = async (req, res, next) => {
	try {
        const active = { order: true };
        const orders = await orderService.getOrders();
    res.render('../components/orders/orderViews/orders',{active: active, orders: orders});
    }
    catch (err) {
        next(err);
    }
}
const testRevenue = async () => {
    const order= await models.orders.findAll({
        where: {
            order_date: {
            [Op.gte]: moment().subtract(10000, 'days').toDate()
          }
        }
      })
      console.log(order)
}


// dailyRevenue()
