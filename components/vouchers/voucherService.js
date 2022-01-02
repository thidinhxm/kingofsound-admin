const { models } = require("../../models");
const sequelize = require('sequelize');

exports.getListVoucher = () => {
  return models.vouchers.findAll({ raw: true });

}