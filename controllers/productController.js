const productService = require("../services/productService")
exports.list = async(req, res)  =>
{   const search_name = req.query.search_name;
    let categories = await productService.listcategory();
    if(search_name)
    {
        const products = await productService.listByName(search_name,!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
        res.render('products/products',{products,categories,search_name});
    }   
    else
    {
        const products = await productService.list(!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
        res.render('products/products',{products,categories});
    }    
}