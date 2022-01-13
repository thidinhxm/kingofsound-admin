const { models } = require('../../models');
const { Op } = require('sequelize');

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
exports.getCategory = (id) => {
	if (isNaN(id)) {
		console.log("Not have cate id:" +id)
		return false;
	}
	return models.categories.findOne({
		where: {
			category_id: id
		},
		raw: true
	});
}

exports.getParentCategory = (id) => {
	if (isNaN(id)) {
		console.log("Not have cate id:" +id)
		return false;
	}
	return models.categories.findOne({
		where: {
			category_id: id
		},
		raw: true
	});
}