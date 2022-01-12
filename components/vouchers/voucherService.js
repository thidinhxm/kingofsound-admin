const { models } = require("../../models");
const sequelize = require('sequelize');

exports.getListVoucher = () => {
  return models.vouchers.findAll({ raw: true });

}
exports.createVoucher = async (newVoucher) =>{
try {
  await models.vouchers.create(newVoucher)
} catch (error) {
  console.log(error)
}
}