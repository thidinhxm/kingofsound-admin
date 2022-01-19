const categoryService = require("./categoryService");
const productService = require("../products/productService");
const active = {product: true}

exports.listCategories = async (req, res, next) => {
	let categories = await categoryService.listCategories();
	res.render('../components/categories/categoryViews/categories',{ active, categories})
}

exports.delete =  async (req, res, next) => {
  try {
	  	const category = await categoryService.getCategory(req.params.id);
		console.log(category);
		if (category.parent_category) {
			await productService.deleteProductsOfCategory(req.params.id)
			await categoryService.deleteCategory(req.params.id)
		}
		else {
			const subCategories = await categoryService.listSubCategories(req.params.id);
			if (subCategories.length > 0) {
				await Promise.all(subCategories.map(async (subCategory) => 
					await productService.deleteProductsOfCategory(subCategory.category_id)
				));

				await Promise.all(subCategories.map(async (subCategory) =>
					await categoryService.deleteCategory(subCategory.category_id)
				));	
			}
			await categoryService.deleteCategory(req.params.id)
		}	
		res.redirect('/categories')
	}catch(err){
		console.log(err)
	}
}

exports.addCategory = async (req, res, next) => {
	try {
		const parentCategories = await categoryService.listParentCategories();
		res.render('../components/categories/categoryViews/add-category', { active, parentCategories });
	}
	catch (err) {
		next(err)
	}
}
exports.storeCategory = async (req, res, next) =>{
	try {
		const { category_name, descriptions, parent_category } = req.body;
		if (parent_category == "0") {
			await categoryService.createCategory({
				category_name,
				descriptions,
				parent_category: null,
			});
		}
		else {
			await categoryService.createCategory({
				category_name,
				descriptions,
				parent_category: parent_category,
			});
		}
		res.redirect('/categories');

	}
	catch (err) {
		next(err);}

}