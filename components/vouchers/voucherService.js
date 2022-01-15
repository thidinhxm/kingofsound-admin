const { models } = require("../../models");
const sequelize = require('sequelize');

exports.getListVoucher = () => {
  return models.vouchers.findAll({ raw: true });

}
exports.createVoucher = async (newVoucher) => {
  try {
    await models.vouchers.create(newVoucher)
  } catch (error) {
    console.log(error)
  }
}

exports.checkExistVoucher = (id) => {
  return models.vouchers.findOne({
    where: {
      voucher_id: id,
    },
    raw: true
  });
}

