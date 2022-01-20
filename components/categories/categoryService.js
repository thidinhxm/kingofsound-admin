const { models } = require('../../models');
const { Op } = require('sequelize');
exports.createCategory = (category) => {
	return models.categories.create(category);
}

exports.deleteCategory = (id) => {
	return models.categories.update({
		is_active: false
	},
	{
		where: {
			category_id: id
		}
	})
}

exports.listCategories = async () => {
	try {
		const categories = await models.categories.findAll({
			include: [{
				model: models.categories,
				as: "parent_category_category",
				atrributes: ['category_name'],
			}],
			where: {
				is_active: true,
			},
			order: ['category_id'],
			raw: true,
		});

		if (categories) {
			categories.forEach(category => {
				category.parent_category_name = category['parent_category_category.category_name'];
			});
		}
		return categories;
	}
	catch (error) {
		throw(error);
	}
};

exports.listParentCategories = () => {
	return models.categories.findAll({
		where: {
			parent_category: null,
			is_active: true,
		},
		raw: true,
	});
};

exports.listSubCategories = (parent_category) => {
	return models.categories.findAll({
		where: {
			parent_category: parent_category,
			is_active: true,
		},
		raw: true,
	});
};

exports.listAllSubCategories = () => {
	return models.categories.findAll({
		atrributes: ['category_id', 'category_name'],
		where: {
			is_active: true,
			parent_category: {
				[Op.ne]: null,
			},
		},
		raw: true,
	});
};

exports.getCategory = async (id) => {
	try {
		const category = await models.categories.findOne({
			attributes: ['category_id', 'category_name', 'parent_category'],
			where: {
				category_id: id,
				is_active: true,
			},
			include: [{
				model: models.categories,
				as: 'parent_category_category',
				attributes: ['category_name'],
				where: {
					is_active: true,
				},
			}],
			raw: true
		});

		category.parent_category_name = category['parent_category_category.category_name'];
		return category;
	}
	catch (error) {
		return error;
	}
}