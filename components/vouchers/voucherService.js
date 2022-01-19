const { models } = require("../../models");
const { Op } = require("sequelize");
exports.listVouchers = (condition) => {
	const option = {
		raw: true,
	};

	if (condition) {
		const page = condition.page || 1;
		const limit = parseInt(condition.limit) || 5;

		option.offset = (page - 1) * limit;
		option.limit = limit;

		if (condition.search_name) {
			option.where = {
				...option.where,
				voucher_id: {
					[Op.like]: `%${condition.search_name}%`,
				},
			};
		}

		if (condition.sort) {
			if (condition.sort === "discount_asc") {
				option.order = [
					["discount", "ASC"],
				];
			}
			else if (condition.sort === "discount_desc") {
				option.order = [
					["discount", "DESC"],
				];
			}
		}

		if (condition.type) {
			if (condition.type == 'pending') {
				option.where = {
					...option.where,
					start_date: {
						[Op.gt]: new Date()
					}
				};	
			}
			else if (condition.type == 'expired') {
				option.where = {
					...option.where,
					end_date: {
						[Op.lt]: new Date()
					}
				};
			}
			else if (condition.type == 'active') {
				option.where = {
					...option.where,
					start_date: {
						[Op.lt]: new Date()
					},
					end_date: {
						[Op.gt]: new Date()
					}
				};
			}
		}
	}
	else {
		option.limit = 5;
		option.offset = 0;
	}
	return models.vouchers.findAndCountAll(option);
}

exports.getVoucher = (id) => {
	return models.vouchers.findOne({
		where: {
			voucher_id: id
		},
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

exports.updateVoucher = (voucher) => {
	return models.vouchers.update(voucher, {
		where: {
			voucher_id: voucher.voucher_id
		}
	});
}

