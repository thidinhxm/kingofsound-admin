const orderService = require('./orderService');
const active = { order: true };

exports.listOders = async (req, res, next) => {
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

exports.getDetails = async (req, res, next) => {
    try {
        const detailOrders = await orderService.getDetailOrders(req.params.id);
        const order = await orderService.getOrder(req.params.id);
        let discount = 0;
        if (order.voucher) {
            const voucher = await orderService.getVoucher(order.voucher);
            discount = voucher.discount;
        }
        res.render('../components/orders/orderViews/order-detail', {order, detailOrders, active, discount })
    }
    catch (error) {
        next(error);
    }
}
