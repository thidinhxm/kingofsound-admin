const {models} = require('../../models');

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
	}
	catch (err) {console.log(err)}
	(res.redirect('/products'));

}