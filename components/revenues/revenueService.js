const { models } = require("../../models");
const sequelize = require('sequelize');

exports.dailyRevenue = (page = 0, itemPerPage = 8) => {
	return models.orders.findAndCountAll({
		attributes: [
			'create_date',
			[sequelize.fn('sum', sequelize.col('total_price')), 'totalRevenue'],
		],
		where: {
			payment_status: 'Đã thanh toán'
		},
		group: ['create_date'],
		order: sequelize.literal('create_date DESC'),
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	})
}

exports.monthlyRevenue = (page = 0, itemPerPage = 8) => {
	return models.orders.findAndCountAll({
		attributes: [
			[sequelize.fn('MONTH', sequelize.col('create_date')), 'month'],
			[sequelize.fn('YEAR', sequelize.col('create_date')), 'year'],
			[sequelize.fn('sum', sequelize.col('total_price')), 'totalRevenue'],
		],
		where: {
			payment_status: 'Đã thanh toán'
		},
		group: [[sequelize.literal('MONTH(create_date)', 'month')], [sequelize.literal('year(create_date)', 'month')]],
		order: sequelize.literal('year DESC'),
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	})
}

exports.yearlyRevenue = (page = 0, itemPerPage = 8) => {
	return models.orders.findAndCountAll({
		attributes: [
			[sequelize.fn('YEAR', sequelize.col('create_date')), 'year'],
			[sequelize.fn('sum', sequelize.col('total_price')), 'totalRevenue'],
		],
		where: {
			payment_status: 'Đã thanh toán',
		},
		group: [sequelize.literal('YEAR(create_date)', 'year')],
		order: sequelize.literal('year DESC'),
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	})
}

exports.getRevenueMonthsByYear = async (year) => {
	try {
		const revenueMonths = await models.orders.findAll({
			attributes: [
				[sequelize.fn('MONTH', sequelize.col('create_date')), 'month'],
				[sequelize.fn('YEAR', sequelize.col('create_date')), 'year'],
				[sequelize.fn('sum', sequelize.col('total_price')), 'totalRevenue'],
			],
			where: {
				payment_status: 'Đã thanh toán',
				query: sequelize.where(sequelize.fn('YEAR', sequelize.col('create_date')), year)
			},
			group: [[sequelize.literal('MONTH(create_date)', 'month')], [sequelize.literal('year(create_date)', 'year')]],
			order: sequelize.literal('year DESC'),
			raw: true,
		});
		
		const month = [...Array(12).keys()].map(item => item + 1);
		return month.map(item => {
			if (revenueMonths.find(month => month.month === item)) {
				return revenueMonths.find(month => month.month === item);
			}
			return {
				month: item,
				year,
				totalRevenue: 0
			}
		})
	}
	catch (err) {
		throw err;
	}
}

