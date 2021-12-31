const cloudinary = require('cloudinary').v2;
const productService = require("./productService")
const { models } = require("../../models");
const dbProduct = models.products;





cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const itemPerPage = 8;
exports.list = async (req, res) => {
	const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
	const search_name = req.query.search_name;
	let categories = await productService.listcategory();
	const active = { product: true }

	if (search_name) {
		const products = await productService.listByName(search_name, page);
		res.render('../components/products/productViews/products', {
			products: products.rows,
			categories,
			search_name,
			Pages: products.count / itemPerPage,
			active
		});
	}
	else {
		const products = await productService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
		res.render('../components/products/productViews/products', {
			products: products.rows,
			categories
			, Pages: products.count / itemPerPage,
			active
		});
	}
}


exports.listByName = async (req, res) => {
	const search_name = req.query.search_name;
	const products = await productService.listByName(search_name, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
	const categories = await productService.listcategory();
	const active = { product: true }

	res.render('../components/products/productViews/products', { products, categories, active });
}

exports.add = async (req, res) => {
	const categories = await productService.listcategory();
	const active = { product: true }

	res.render('../components/products/productViews/add-product', { categories, active });

}

const { google } = require('googleapis');
const path = require('path');






// exports.store = async (req, res) => {
exports.store = async (req, res, next) => {



	const selectedCategory = await models.categories.findOne({where: {category_name: req.body.category}, raw: true})

	const newProduct = await models.products.create({
		category_id: selectedCategory.category_id,
		product_name: req.body.name,
		price: req.body.price,
		descriptions: req.body.descriptions,
		model_year: req.body.model_year,
		is_active: 1,
	});

	const imgProduct = await models.images.create({
		product_id: newProduct.product_id,
		image_stt: 1,
		image_link: req.body.image_link
	});

	res.redirect('/products');

	// const listLinkImages = await productService.getListLinkImage();
	// res.json(listLinkImages)


	// linkImage();
}

exports.edit = async (req, res) => {
	const currentProduct = await models.products.findOne({ where: { product_id: req.params.id }, raw: true })
	const currentCategory = currentProduct.category_id;
	const imgProduct = await models.images.findOne({ where: { product_id: req.params.id }, raw: true });
	const curentCategoryProduct = await models.categories.findOne({ where: { category_id: currentCategory }, raw: true });
	const categories = await productService.listcategory();
	const active = { product: true }


	res.render('../components/products/productViews/edit-product', { currentProduct, categories, curentCategoryProduct, imgProduct, active });
	// res.json(curentCategoryProduct)
}

exports.update = async (req, res, next) => {
	const categoryUpade = await models.categories.findOne({ where: { category_name: req.body.category, } })
	const productUpdate = {
		product_name: req.body.name,
		price: req.body.price,
		category_id: categoryUpade.category_id,
		model_year: req.body.model_year,
		descriptions: req.body.descriptions
	}

	await models.products.update(productUpdate, { where: { product_id: req.params.id } })
		(res.redirect('/products'))
	// res.json(categoryUpade)
}



exports.delete = async (req, res) => {
	await models.products.update({
		is_active: false
	}, {
		where: {
			product_id: req.params.id,
		}
	})
		// const currentProduct = await models.products.findOne({ where: { product_id: req.params.id }, raw: true })

		(res.redirect('/products'));
};

exports.addCategory = (req, res, next) =>{
	res.render('../components/products/productViews/add-category')
}
exports.storeCategory = async (req, res) =>{
	const newCategory = {
		category_name: req.body.category_name,
		descriptions: req.body.descriptions,
		parent_category: req.body.parent_category,
	}
	try {
		await models.categories.create(newCategory)
	}
	catch (err) {console.log(err)}
	(res.redirect('/products'));

}
