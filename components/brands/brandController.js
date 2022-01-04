const brandService = require("./brandService");
const active = {product: true}

exports.listBrands = async function (req, res, next) {
	let brands = await brandService.listBrands();
	res.render('../components/brands/brandViews/brands', { active, brands})

}

exports.delete = (req, res, next) => {
  res.send('Delete Ok')
}

