const { models } = require("../../models");
const sequelize = require('sequelize');

exports.dailyRevenue = () => {
	return models.orders.findAll({
			attributes: [
				'create_date',
				[sequelize.fn('sum', sequelize.col('total_price')),'totalRevenue'],
			],
			group: ['create_date'],
			order: sequelize.literal('create_date DESC'),
			raw: true,
	})
}

exports.monthlyRevenue = () => {
	return models.orders.findAll({
		attributes: [
			[sequelize.fn('MONTH', sequelize.col('create_date')), 'month'] ,
			[sequelize.fn('YEAR', sequelize.col('create_date')), 'year'] ,
			[sequelize.fn('sum', sequelize.col('total_price')),'totalRevenue'],
		],
		group: [[sequelize.literal('MONTH(create_date)', 'month')],[sequelize.literal('year(create_date)', 'month')]],
		order: sequelize.literal('create_date DESC'),
		raw: true,
	})
}

exports.yearlyRevenue = () => {
	return models.orders.findAll({
		attributes: [
			[sequelize.fn('YEAR', sequelize.col('create_date')), 'year'],
			[sequelize.fn('sum', sequelize.col('total_price')),'totalRevenue'],
		],
		group: [sequelize.literal('YEAR(create_date)', 'year')],
		order: sequelize.literal('create_date DESC'),
		raw: true,
	})
}
