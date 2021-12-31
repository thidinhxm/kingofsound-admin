const { models } = require("../../models");
const sequelize = require('sequelize');

exports.dailyRevenue =  () => {
  const dailyRevenue =  models.orders.findAll({
      attributes: [
          'order_date',
          [sequelize.fn('sum', sequelize.col('order_total_price')),'totalRevenue'],
      ],
      group: ['order_date'],
      order: sequelize.literal('order_date DESC'),
      raw: true,
  })
  console.log(dailyRevenue)
  return dailyRevenue
}

exports.monthlyRevenue =   () => {
  const monthlyRevenue =   models.orders.findAll({
      attributes: [
          [sequelize.fn('MONTH', sequelize.col('order_date')), 'month'] ,
          [sequelize.fn('YEAR', sequelize.col('order_date')), 'year'] ,
          [sequelize.fn('sum', sequelize.col('order_total_price')),'totalRevenue'],
      ],
      group: [[sequelize.literal('MONTH(order_date)', 'month')],[sequelize.literal('year(order_date)', 'month')]],
      order: sequelize.literal('order_date DESC'),
      raw: true,
  })
  console.log(monthlyRevenue)
  return monthlyRevenue
}

exports.yearlyRevenue =   () => {
  const yearlyRevenue =   models.orders.findAll({
      attributes: [
        [sequelize.fn('YEAR', sequelize.col('order_date')), 'year'],
        [sequelize.fn('sum', sequelize.col('order_total_price')),'totalRevenue'],
      ],
      group: [sequelize.literal('YEAR(order_date)', 'year')],
      order: sequelize.literal('order_date DESC'),
      raw: true,
  })
  console.log(yearlyRevenue)
  return yearlyRevenue
}
