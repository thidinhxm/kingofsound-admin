const brandService = require("./brandService");
const productService = require("../products/productService");
const active = { product: true }

exports.listBrands = async function (req, res, next) {
	let brands = await brandService.listBrands();
	res.render('../components/brands/brandViews/brands', { active, brands })

}
exports.add = (req, res, next) => {
	res.render('../components/brands/brandViews/add-brand', { active })

}
exports.delete = async (req, res, next) => {
	try {
		await productService.deleteProductsOfBrand(req.params.id)
		await brandService.deleteBrand(req.params.id)
		res.redirect('/brands')
	} catch (error) {
		console.log(error);
	}
}
exports.store = async (req, res, next) => {
	try {
		const { brand_name, address, descriptions } = req.body;
		const newBrand = { brand_name, address, descriptions };
		await brandService.createBrand(newBrand);
		res.redirect('/brands')
	} catch (error) {
		console.log(error);
	}
}
