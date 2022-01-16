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

exports.list = async (req, res, next) => {
	try {
		// data for render Product view
		const parentCategories = await categoryService.listParentCategories();
		const brands = await brandService.listBrands();
		const active = { product: true }
		const productsRowAndCount = await productService.list();
		const pagination = {
			page: 1,
            limit: 9,
            totalRows: productsRowAndCount.count,
            pages: Math.ceil(productsRowAndCount.count / 9) || 1
		}

		res.render('../components/products/productViews/products', {
			products: productsRowAndCount.rows,
			parentCategories,
			brands,
			pagination,
			active
		});
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


exports.edit = async (req, res, next) => {
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

exports.delete = async (req, res, next) => {
	try {
		await productService.lockProduct(req.params.id);
		req.flash('success', 'Xóa sản phẩm thành công');
		res.redirect('/products');
	}
	catch (err) {
		next(err);
	}
};

