const {models} = require('../../models');
const {Op} = require('sequelize');

exports.listcategory = () => {
    return models.categories.findAll({
		where: {
			category_id: {
			[Op.notIn]: [1, 2],
			},
		},
		raw: true,
	});
};