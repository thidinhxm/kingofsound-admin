const productService = require("../services/productService")
const products = require("../models/products");
const {models} = require("../models");
const dbProduct= models.products;




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

exports.store=(req,res, next) => {

    // res.json(req.body)
    const newProduct= {
        product_id: "113",
        category_id: 'speaker0',
        product_name:  req.body.name,
        price:  req.body.price,
        categories:  req.body.category
    };

    models.products.create(newProduct)
    .then(res.redirect('/products'))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });

}

exports.edit= async (req,res) => {

  const currentProduct =await dbProduct.findOne({where: { product_id: req.params.id},raw:true})
  res.render('products/edit-product',{currentProduct});
  // res.json(currentProduct)
  

}

exports.update= (req,res, next) => {
  // const updateProduct = dbProduct.findOne({where: { product_id: req.params.id},raw:true})

  // models.products.find({ where: { product_id:  req.params.id } })
  // .on('success', function (product) {
  //   // Check if record exists in db
  //   if (product) {
  //     product.update({
  //       product_name: updateProduct.product_name,
  //       descriptions: updateProduct.descriptions,
  //       model_year = updateProduct.model_year
  //     })
  //     .success(function () {})
  //   }
  // })
    res.send("DMM")

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


