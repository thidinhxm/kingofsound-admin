const categoryService = require("./categoryService");

const active = {product: true}

exports.listcategory = async (req, res, next) => {
	let categories = await categoryService.listcategory();
	res.render('../components/categories/categoryViews/categories',{ active, categories})
}

exports.delete =  (req, res, next) => {
  res.send('delete OK')
}

exports.addCategory = (req, res, next) =>{
	res.render('../components/categories/categoryViews/add-category')
}
exports.storeCategory = async (req, res, next) =>{
	try {
		
		const { category_name, descriptions, parent_category } = req.body;

		await categoryService.createCategory({
			category_name,
			descriptions,
			parent_category,
		})

		res.redirect('/categories');

	}
	catch (err) {
		next(err);}

}