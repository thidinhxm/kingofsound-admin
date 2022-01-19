const voucherService = require('./voucherService')
const active = {order: true}

exports.index = async (req, res, next) =>{
	const vouchers = await voucherService.getListVoucher()
	res.render('../components/vouchers/voucherViews/vouchers',{vouchers,active})
}


exports.edit = async (req, res, next) =>{

}

exports.add =  (req, res, next) => {
	res.render('../components/vouchers/voucherViews/add-voucher', {active})
}

exports.store = async (req, res, next) =>{
	try {
		const {voucher_code, discount,start_date, end_date} = req.body
		const newVoucher = {
			voucher_id: voucher_code,
			discount: discount,
			start_date: start_date,
			end_date: end_date,
		}
		await voucherService.createVoucher(newVoucher)
		req.flash('success', 'Thêm mã giảm giá thành công');
		res.redirect('/vouchers');
	}
	catch(err){
		next(err);
	}
}