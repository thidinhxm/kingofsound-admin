const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const { models } = require("../../models");
const productService = require("./productService");
const brandService = require("../brands/brandService");
const categoryService = require("../categories/categoryService");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.list = async (req, res, next) => {
	try {
		// data for filter and search
		const search_name = req.query.search_name;
		const selected_filter_brand = req.query.filter_brand
		const selected_filter_parentCategory = req.query.filter_parentCategory
		const selected_filter_subCategory = req.query.filter_subCategory

		// data for render Product view
		const itemPerPage = 8;
		let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
		let categories = await categoryService.listcategory();
		const parentCategories = await categoryService.listParentCategories();
		const brands = await brandService.listBrands();
		let active = { product: true, }

		if (search_name) {
			const products = await productService.listByName(search_name, page);
			const Pages = Math.round(products.count / itemPerPage);
			let next = page < Pages - 1 ? page + 2 : Pages;
			let previous = page > 0 ? page : 1;
			res.render('../components/products/productViews/products', {
				products: products.rows,
				categories,
				parentCategories,
				brands,
				search_name,
				Pages,
				next,
				previous,
				indexpage: page,
				active
			});
		}
		else if (selected_filter_brand || selected_filter_parentCategory || selected_filter_subCategory) {
			const subCategory= await categoryService.getCategory(selected_filter_subCategory)
			const brand = await brandService.getBrand(selected_filter_brand)
			const parentCategory = await categoryService.getParentCategory(selected_filter_parentCategory)

			const filter_brand = isNaN(selected_filter_brand) ? [1, 2, 3] : [selected_filter_brand];
			const filter_parentCategory = isNaN(selected_filter_parentCategory) ? [1, 2] : [selected_filter_parentCategory]
			const filter_subCategory = isNaN(selected_filter_subCategory) ? [3, 4, 5, 6] : [selected_filter_subCategory];
			const products = await productService.filterProduct(filter_parentCategory, filter_subCategory, filter_brand)
			const filterCriteria = {
				parentCategory: parentCategory.category_name,
				subCategory:subCategory.category_name,
				brand: brand.brand_name,

			}
			console.log(filterCriteria)
			const Pages = Math.round(products.count / itemPerPage);
			let next = page < Pages - 1 ? page + 2 : Pages;
			let previous = page > 0 ? page : 1;
			res.render('../components/products/productViews/products', {
				products: products.rows,
				filterCriteria,
				categories,
				parentCategories,
				brands,
				Pages,
				next,
				previous,
				indexpage: page,
				active
			});
		}
		else {
			const products = await productService.list(page);
			const Pages = Math.round(products.count / itemPerPage);
			let next = page < Pages - 1 ? page + 2 : Pages;
			let previous = page > 0 ? page : 1;
			res.render('../components/products/productViews/products', {
				products: products.rows,
				categories,
				parentCategories,
				brands,
				Pages,
				next,
				previous,
				indexpage: page,
				active
			});
		}
	}
	catch (err) {
		next(err);
	}
}

exports.listByName = async (req, res, next) => {
	try {
		const search_name = req.query.search_name;
		const products = await productService.listByName(search_name, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
		const categories = await categoryService.listcategory();
		const active = { product: true }

		res.render('../components/products/productViews/products', { products, parentCategories, categories, brands, active });
	}
	catch (err) {
		next(err);
	}
}

exports.add = async (req, res, next) => {
	try {
		const categories = await categoryService.listParentCategories();
		const brands = await brandService.listBrands();
		const active = { product: true }

		res.render('../components/products/productViews/add-product', { categories, brands, active });
	}
	catch (err) {
		next(err);
	}

}

exports.addProductPost = async (req, res, next) => {
	try {
		const form = formidable({ multiples: true });
		form.parse(req, async (err, fields, files) => {
			if (err) {
				next(err);
			}
			else {
				const newProduct = (await productService.addProduct({
					product_name: fields.name,
					price: fields.price,
					category_id: fields.subCategory,
					descriptions: fields.descriptions,
					brand_id: fields.brand,
					model_year: fields.model_year,
				})).get({ plain: true });


				const image = [];

				if (files.image1) {
					await cloudinary.uploader.upload(files.image1['filepath'], {
						folder: 'products',
					}, (err, result) => {
						if (err) {
							console.log(err);
						}
						else {
							image.push(result.url);
						}
					});
				}

				if (files.image2) {
					await cloudinary.uploader.upload(files.image2['filepath'], {
						folder: 'products',
					}, (err, result) => {
						if (err) {
							console.log(err);
						}
						else {
							image.push(result.url);
						}
					});
				}

				if (files.image3) {
					await cloudinary.uploader.upload(files.image3['filepath'], {
						folder: 'products',
					}, (err, result) => {
						if (err) {
							console.log(err);
						}
						else {
							image.push(result.url);
						}
					});
				}

				if (files.image4) {
					await cloudinary.uploader.upload(files.image4['filepath'], {
						folder: 'products',
					}, (err, result) => {
						if (err) {
							console.log(err);
						}
						else {
							image.push(result.url);
						}
					});
				}

				image.forEach(async (item, index) => {
					await models.images.create({
						product_id: newProduct.product_id,
						image_stt: index + 1,
						image_link: item
					});
				});

				req.flash('success', 'Thêm sản phẩm thành công');
				res.redirect('/products');
			}
		});
	}
	catch (err) {
		next(err);
	}
}


exports.edit = async (req, res, next) => {
	try {
		const currentProduct = await models.products.findOne({ where: { product_id: req.params.id }, raw: true })
		const currentCategory = currentProduct.category_id;
		const imgProduct = await models.images.findOne({ where: { product_id: req.params.id }, raw: true });
		const curentCategoryProduct = await models.categories.findOne({ where: { category_id: currentCategory }, raw: true });
		const categories = await categoryService.listcategory();
		const active = { product: true }


		res.render('../components/products/productViews/edit-product', { currentProduct, categories, curentCategoryProduct, imgProduct, active });
	}
	catch (err) {
		next(err);
	}
}

exports.update = async (req, res, next) => {
	try {
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
	}
	catch (err) {
		next(err);
	}
}

exports.delete = async (req, res, next) => {
	try {
		await models.products.update({
			is_active: false
		}, {
			where: {
				product_id: req.params.id,
			}
		})
			(res.redirect('/products'));
	}
	catch (err) {
		next(err);
	}
};

