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
        res.render('products/products',{products:products.rows,categories,search_name,Pages:products.count/itemPerPage});
    }   
    else
    {
        const products = await productService.list(!isNaN(req.query.page)&&req.query.page>0?req.query.page-1:0);
        res.render('products/products',{products:products.rows,categories,Pages:products.count/itemPerPage});
    }    
}