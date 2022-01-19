
const voucherService = require('./voucherService');

exports.checkExistVoucher = async (req, res, next) => {
    try {
        const { voucher_id } = req.body;
        const voucher = await voucherService.checkExistVoucher(voucher_id);
        if (voucher)
            res.json(true)
        else
            res.json(false)
    }
    catch (err) {
        next(err);
    }
}

exports.getVoucherPaginate = async (req, res, next) => {
    try {
        const { page, limit, search_name, sort, type} = req.body;
        const vouchersRowAndCount = await voucherService.listVouchers({ page, limit, search_name, sort, type });
        const pagination = {
            page: page,
            limit: limit,
            totalRows: vouchersRowAndCount.count,
            pages: Math.ceil(vouchersRowAndCount.count / limit) || 1,
        }
        res.json({
            vouchers: vouchersRowAndCount.rows,
            pagination,
            success: true
        });
    }
    catch (err) {
        next(err);
    }
}