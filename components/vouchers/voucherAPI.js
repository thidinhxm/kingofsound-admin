
const voucherService = require('./voucherService');

exports.checkExistVoucher = async (req, res, next) => {
    try {
        const { voucher_id } = req.body;
        const voucher = await voucherService.checkExistVoucher(voucher_id);
        console.log(voucher)
        console.log(voucher_id)
        if (voucher)
            res.json(true)
        else
            res.json(false)
    }
    catch (err) {
        next(err);
    }
}