const {models} = require('../../models');
const voucherService = require('./voucherService')
const active = {order: true}

exports.index = async (req, res, next) =>{
  const vouchers = await voucherService.getListVoucher()
  console.log(vouchers)
  res.render('../components/vouchers/voucherViews/vouchers',{vouchers,active})
}

exports.edit = async (req, res, next) =>{
  
}
// vouncher()