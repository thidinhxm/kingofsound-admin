const voucherService = require('./voucherService')
const active = {order: true}

exports.index = async (req, res, next) => {
	try {
		const vouchersRowAndCount = await voucherService.listVouchers();
		const pagination = {
			page: 1,
			limit: 5,
			totalRows: vouchersRowAndCount.count,
			pages: Math.ceil(vouchersRowAndCount.count / 5) || 1,
		}
		res.render('../components/vouchers/voucherViews/vouchers',{
			vouchers: vouchersRowAndCount.rows,
			totalVouchers: vouchersRowAndCount.count,
			pagination,
			active
		});
	}
	catch(err) {
		next(err);
	}
}


exports.edit = async (req, res, next) => {
	try {
		const voucher = await voucherService.getVoucher(req.params.id)
	 	res.render('../components/vouchers/voucherViews/edit-voucher', {voucher, active});
	}
	catch(err) {
		next(err)
	}
}

exports.add =  (req, res, next) => {
	res.render('../components/vouchers/voucherViews/add-voucher', {active})
}

exports.store = async (req, res, next) =>{
	try {
		const {voucher_code, discount, start_date, end_date} = req.body
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

exports.updateVoucher = async (req, res, next) => {
	try {
		const {voucher_code, discount, start_date, end_date} = req.body
		const newVoucher = {
			voucher_id: voucher_code,
			discount: discount,
			start_date: start_date,
			end_date: end_date,
		}
		await voucherService.updateVoucher(newVoucher)
		req.flash('success', 'Cập nhật mã giảm giá thành công');
		res.redirect('/vouchers');
	}
	catch(err){
		next(err);
	}
}