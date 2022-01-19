const { models } = require("../../models");

exports.getListVoucher = () => {
	return models.vouchers.findAll({ 
		raw: true 
	});

}
exports.createVoucher = (voucher) => {
	return models.vouchers.create(voucher);
}

exports.checkExistVoucher = (id) => {
	return models.vouchers.findOne({
		where: {
			voucher_id: id,
		},
		raw: true
	});
}

