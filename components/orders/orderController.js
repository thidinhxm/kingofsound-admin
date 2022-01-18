const orderService = require('./orderService');
const active = { order: true };


exports.getOders = async (req, res, next) => {
    try {
        const ordersRowAndCount = await orderService.listOrders();
        const pagination = {
            page: 1,
            limit: 5,
            totalRows: ordersRowAndCount.count,
            pages: Math.ceil(ordersRowAndCount.count / 5) || 1
        }
        res.render('../components/orders/orderViews/orders', { 
            active, 
            orders: ordersRowAndCount.rows,
            totalOrders: ordersRowAndCount.count,
            pagination
        });
    }
    catch (err) {
        next(err);
    }
}
exports.edit = async (req, res, next) => {
    try {
        const order = await orderService.detailOrder(req.params.id);
        res.render('../components/orders/orderViews/order-edit', {order,active})
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const currentOrder = {
            order_status: req.body.order_status,
            payment_status: req.body.payment_status,
        }
        await orderService.updateOrder(req.body.order_id, currentOrder);
        console.log(currentOrder)
       res.redirect('/orders')
    }
    catch (error) {
        console.error(error)
    }
}


// dailyRevenue()
