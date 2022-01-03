const categoryService = require('./categoryService');

exports.getSubCategories = async (req, res, next) => {
    try {
        const parent_category_id = req.query.category_id;
        const categories = await categoryService.listSubCategories(parent_category_id);
        res.json(categories);
    } catch (err) {
        res.json(false);
    }
}