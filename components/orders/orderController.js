const orderService = require('./orderService');
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
