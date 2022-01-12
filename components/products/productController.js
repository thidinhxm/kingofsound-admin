const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const productService = require("./productService");
const brandService = require("../brands/brandService");
const categoryService = require("../categories/categoryService");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.list = async (req, res,next) => {
	try {
		const itemPerPage = 8;
		let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
		const search_name = req.query.search_name;
		let categories = await categoryService.listcategory();
		let active = { product: true,}

		if (search_name) {
			const products = await productService.listByName(search_name, page);
			const Pages = Math.ceil(products.count / itemPerPage);
			let next =page < Pages - 1?page+2:Pages;
			let previous =page>0?page:1;
			res.render('../components/products/productViews/products', {
				products: products.rows,
				categories,
				search_name,
				Pages,
				next,
				previous,
				indexpage:page,
				active
			});
		}
		else {
			const products = await productService.list(page);
			const Pages = Math.round(products.count / itemPerPage);
			let next =page < Pages - 1? page+2:Pages;
			let previous =page>0?page:1;
			res.render('../components/products/productViews/products', {
				products: products.rows,
				categories
				, Pages,
				next,
				previous,
				indexpage:page,
				active
			});
		}
	}
	catch (err) {
		next(err);
	}
}

exports.listByName = async (req, res,next) => {
	try {
		const search_name = req.query.search_name;
		const products = await productService.listByName(search_name, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
		const categories = await categoryService.listcategory();
		const active = { product: true }

		res.render('../components/products/productViews/products', { products, categories, active });
	}
	catch (err) {
		next(err);
	}
}

exports.add = async (req, res,next) => {
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
					await productService.createImageProduct({
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


exports.edit = async (req, res,next) => {
	try {
		const active = { product: true }
		const categories = await categoryService.listParentCategories();
		const brands = await brandService.listBrands();
		const product = await productService.getProductById(req.params.id);
		product.images = await productService.getImagesProduct(req.params.id);
		product.categories = await categoryService.getCategory(product.category_id);
		product.brand = await brandService.getBrand(product.brand_id);
		res.render('../components/products/productViews/edit-product', { 
			product, 
			categories, 
			brands,
			active 
		});
	}
	catch (err) {
		next(err);
	}
}

exports.update = async (req, res, next) => {
	try {
		const form = formidable({ multiples: true });
		form.parse(req, async (err, fields, files) => {
			if (err) {
				next(err);
			}
			else {
				const product = await productService.getProductById(req.params.id);
				await productService.updateProduct({
					product_id: req.params.id,
					product_name: fields.name,
					price: fields.price,
					category_id: fields.subCategory,
					descriptions: fields.descriptions,
					brand_id: fields.brand,
					model_year: fields.model_year,
				});

				if (files.image1) {
					if (files.image1['size'] > 0) {
						await cloudinary.uploader.upload(files.image1['filepath'], {
							folder: 'products',
						}, (err, result) => {
							if (err) {
								console.log(err);
							}
							else {
								productService.updateImageProduct(product.product_id, 1, result.url);
							}
						});
					}
				}
				
				if (files.image2) {
					if (files.image2['size'] > 0) {
						await cloudinary.uploader.upload(files.image2['filepath'], {
							folder: 'products',
						}, (err, result) => {
							if (err) {
								console.log(err);
							}
							else {
								productService.updateImageProduct(product.product_id, 2, result.url);
							}
						});
					}
				}

				if (files.image3) {
					if (files.image3['size'] > 0) {
						await cloudinary.uploader.upload(files.image3['filepath'], {
							folder: 'products',
						}, (err, result) => {
							if (err) {
								console.log(err);
							}
							else {
								productService.updateImageProduct(product.product_id, 3, result.url);
							}
						});
					}
				}

				if (files.image4) {
					if (files.image4['size'] > 0) {
						await cloudinary.uploader.upload(files.image4['filepath'], {
							folder: 'products',
						}, (err, result) => {
							if (err) {
								console.log(err);
							}
							else {
								productService.updateImageProduct(product.product_id, 4, result.url);
							}
						});
					}
				}
				req.flash('success', 'Cập nhật sản phẩm thành công');
				res.redirect('/products');
			}
		});
	}
	catch (err) {
		next(err);
	}
}

exports.delete = async (req, res,next) => {
	try {
		await productService.lockProduct(req.params.id);
		req.flash('success', 'Xóa sản phẩm thành công');
		res.redirect('/products');
	}
	catch (err) {
		next(err);
	}
};
