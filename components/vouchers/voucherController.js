const {models} = require('../../models');
const voucherService = require('./voucherService')
const active = {order: true}

exports.index = async (req, res, next) =>{
  const vouchers = await voucherService.getListVoucher()
  // console.log(vouchers)
  res.render('../components/vouchers/voucherViews/vouchers',{vouchers,active})
}

exports.delete = async (req, res, next) =>{
  // res.send('Del')
  try{
  let voucherDelected = await models.vouchers.findOne({where: {voucher_id: req.params.id}})
  console.log(voucherDelected)
  await voucherDelected.destroy(voucherDelected)
  res.redirect('/vouchers')
  }
  catch(err){console.log(err)}
}

exports.edit = async (req, res, next) =>{

}


// vouncher()