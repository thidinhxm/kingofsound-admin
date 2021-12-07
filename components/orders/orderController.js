
exports.getOders = (req, res, next) => {
	const active = { order: true }

    res.render('../components/orders/orderViews/order',{active});
}