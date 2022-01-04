const brandService = require("./brandService");
const { models } = require("../../models");
const active = {product: true}
exports.listbrand = async function (req, res, next) {
	let brands = await brandService.listbrand();
	res.render('../components/brands/brandViews/brands',{ active,brands})

}

exports.delete = (req, res, next) => {
  res.send('Delete Ok')
}

