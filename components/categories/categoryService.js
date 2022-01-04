const {models} = require('../../models');
const {Op} = require('sequelize');

exports.createCategory = (category) => {
	return models.sub_categories.create(category);
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
