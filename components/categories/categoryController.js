const categoryService = require("./categoryService");
const { models } = require("../../models");
const active = {product: true}

exports.listcategory = async function (req, res, next) {
	let categories = await categoryService.listcategory();
	res.render('../components/categories/categoryViews/categories',{ active,categories})
}

exports.delete =  (req, res, next) => {
  res.send('delete OK')
}

exports.addCategory = (req, res, next) =>{
	res.render('../components/categories/categoryViews/add-category')
}
exports.storeCategory = async (req, res) =>{
	const newCategory = {
		category_name: req.body.category_name,
		descriptions: req.body.descriptions,
		parent_category: req.body.parent_category,
	}
	try {
		await models.categories.create(newCategory)
		console.log(newCategory)
		res.redirect('/categories');

	}
	catch (err) {console.log(req.body)}

}