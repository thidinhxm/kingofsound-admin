const productService = require("../services/productService")
const itemPerPage = 8;
exports.list = async(req, res)  =>
{   
    const page = !isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0;
    const search_name = req.query.search_name;
    let categories = await productService.listcategory();
    
    if(search_name)
    {
        const products = await productService.listByName(search_name,page);
        const Amount = await productService.AmountByName(search_name);
        res.render('products/products',{products,categories,search_name,Amount,itemPerPage});
    }   
    else
    {
        const products = await productService.list(!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
        const Amount = await productService.Amount();
        res.render('products/products',{products,categories,Amount,itemPerPage});
    }    
}