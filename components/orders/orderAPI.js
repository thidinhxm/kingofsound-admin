const orderService = require('./orderService');

exports.getOrdersPaginate = async (req, res, next) => {
    try {
        const { search_name, sort, page, limit, type } = req.body;
        const ordersRowAndCount = await orderService.listOrders({ search_name, sort, page, limit, type });
        if (ordersRowAndCount) {
            const pagination = {
                page: parseInt(page),
                limit: parseInt(limit) || 5,
                totalRows: ordersRowAndCount.count,
                pages: Math.ceil(ordersRowAndCount.count / (limit || 5)) || 1
            }
            res.json({
                orders: ordersRowAndCount.rows,
                success: true,
                pagination: pagination
            });
        }
    }
    catch (err) {
        next(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const currentOrder = {
            order_status: req.body.order_status,
            payment_status: req.body.payment_status,
        }
        await orderService.updateOrder(req.params.id, currentOrder);
        res.json(true);
    }
    catch (error) {
        res.json(false);
    }
}