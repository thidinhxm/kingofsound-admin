const productService = require("../services/productService")
exports.list = async(req, res)  =>
{
    const products = await productService.list(!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
    const categories = await productService.listcategory();
    res.render('products/products',{products,categories});
}
exports.listByName = async(req, res)  =>
{   const search_name = req.query.search_name;
    const products = await productService.listByName(search_name,!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
    const categories = await productService.listcategory();
    res.render('products/products',{products,categories});
}