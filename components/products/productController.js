const productService = require("./productService")
const { models } = require("../../models");
const randomString = require("randomstring");
const dbProduct = models.products;

const itemPerPage = 8;
exports.list = async(req, res)  => {   
		const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page -1 : 0;
		const search_name = req.query.search_name;
		let categories = await productService.listcategory();
		if(search_name) {
            const products = await productService.listByName(search_name, page);
            res.render('../components/products/productViews/products', {
                products: products.rows,
                categories,
                search_name,
                Pages: products.count / itemPerPage
            });
		}   
		else {
            const products = await productService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page -1 : 0);
            res.render('../components/products/productViews/products', {
                products: products.rows,
                categories
                , Pages:products.count / itemPerPage
            });
		}    
}


exports.listByName = async (req, res) => {
	const search_name = req.query.search_name;
	const products = await productService.listByName(search_name, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
	const categories = await productService.listcategory();
	res.render('../components/products/productViews/products', { products, categories });
}

exports.add = async (req, res) => {
	const categories = await productService.listcategory();
	res.render('../components/products/productViews/add-product', {categories});
	
}

exports.store = async (req, res) => {
	const newProduct = await models.products.create({
		product_id: randomString.generate(7),
		category_id: 'speaker0',
		product_name: req.body.name,
		price: req.body.price,
		descriptions: req.body.descriptions,
		model_year: req.body.model_year,
		isActive: 1,
	});
	
	const imgProduct = await models.images.create({
		product_id: newProduct.product_id,
		image_stt: 1,
		image_link: req.body.image_link
	});

	res.redirect('/products');

}

exports.edit = async (req, res) => {
	const currentProduct = await models.products.findOne({ where: { product_id: req.params.id }, raw: true })
	const currentCategory = currentProduct.category_id;
	const imgProduct = await models.images.findOne({ where: { product_id: req.params.id }, raw: true });
	const categoryProduct = await models.categories.findOne({ where: { category_id: currentCategory }, raw: true });
	const categories = await productService.listcategory();


	res.render('../components/products/productViews/edit-product', { currentProduct, categories, imgProduct, });
}

exports.update = async (req, res, next) => {
	const productUpdate = {
		product_name: req.body.name,
		price: req.body.price,
		categories: req.body.category,
		model_year: req.body.model_year,
		descriptions: req.body.descriptions
	}
	models.products.update(productUpdate, { where: { product_id: req.params.id } })
		.then(res.redirect('/products'))
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Product."
			});
		});

}



exports.delete = async (req, res) => {
	await models.products.update({
        isActive: false
    },{
        where: {
            product_id: req.params.id,
        }
    })
    // const currentProduct = await models.products.findOne({ where: { product_id: req.params.id }, raw: true })

    (res.redirect('/products'));
};


