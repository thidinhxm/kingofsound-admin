const productService = require('./productService');

exports.searchSuggest = async (req, res, next) => {

    try {
        const { search_name } = req.body;
        const products = await productService.getProductSuggest(search_name);
        if (products)
            res.json({
                products: products,
                success: true
            });
        else
            res.json({ success: false });
    }
    catch (err) {
        next(err);
    }
}

exports.getProductsPaginate = async (req, res, next) => {
    try {
        const {search_name, category_id, brand_id, sort, page, limit} = req.body;
        const productsRowAndCount = await productService.list({search_name, category_id, brand_id, sort, page, limit});
        if (productsRowAndCount) {
            const pagination = {
                page: page,
                limit: limit || 9,
                totalRows: productsRowAndCount.count,
                pages: Math.ceil(productsRowAndCount.count / (limit || 9)) || 1
            }
            res.json({
                products: productsRowAndCount.rows,
                success: true,
                pagination: pagination
            });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (err) {
        next(err);
    }
}