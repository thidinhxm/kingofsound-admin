const productService = require("../services/productService")
const products = require("../models/products");
const {models} = require("../models");
const dbProduct= models.products;
const randomString = require("randomstring");





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

exports.add = (req, res, next) =>{
    res.render('products/add-product');
}

exports.store = async(req,res) => {


     const newProduct= await models.products.create({
        product_id: randomString.generate(7),
        category_id: 'speaker0',
        product_name:  req.body.name,
        price:  req.body.price,
        descriptions: req.body.descriptions,
        model_year: req.body.model_year,
        isActive: 1,
    });
   
    res.redirect('/products');

}

exports.edit= async (req,res) => {

  const currentProduct =await dbProduct.findOne({where: { product_id: req.params.id},raw:true})
  res.render('products/edit-product',{currentProduct});
  // res.json(currentProduct)
  

}

exports.update= async(req,res, next) => {

    const productUpdate ={
    product_name:  req.body.name,
    price:  req.body.price,
    categories:  req.body.category,
    model_year: req.body.model_year,
    descriptions: req.body.descriptions
   }
   models.products.update(productUpdate, {where:{product_id:req.params.id}})
    .then(res.redirect('/products'))

    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });

    }



exports.delete = (req, res) => {
  models.products.find({ where: { product_id: req.body.product_id } })
  .on('success', function (project) {
    // Check if record exists in db
    if (project) {
      project.update({
        isActive:false
      })
      .success(function () {})
    }
  })
};


