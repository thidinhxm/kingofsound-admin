const orderService = require('./orderService');
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