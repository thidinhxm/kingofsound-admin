const { models } = require('../../models');
const { Op } = require('sequelize');

exports.createCategory = (category) => {
	return models.categories.create(category);
}
exports.deleteCategory = (id) => {
	return models.categories.destroy({
			where: {
				category_id: id
			}
	})
}

exports.listcategory = () => {
	return models.categories.findAll({
		where: {
			parent_category: {
				[Op.ne]: null,
			},
		},
		raw: true,
	});
};

exports.listParentCategories = () => {
	return models.categories.findAll({
		where: {
			parent_category: null,
		},
		raw: true,
	});
};

exports.listSubCategories = (parent_category) => {
	return models.categories.findAll({
		where: {
			parent_category,
		},
		raw: true,
	});
};

exports.getCategory = async (id) => {
    try {
        const category = await models.categories.findOne({
            attributes : [ 'category_id', 'category_name', 'parent_category' ],
            where : {
                category_id : id
            },
            include : [{
                model : models.categories,
                as : 'parent_category_category',
                attributes : ['category_name'],
			}],
			raw : true
        });

        category.parent_category_name = category['parent_category_category.category_name'];
        return category;
    }
    catch (error) {
        return error;
    }
}