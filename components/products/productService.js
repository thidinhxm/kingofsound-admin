const { models } = require("../../models");
const { Op } = require("sequelize");

exports.listProducts = () => {
	return models.products.findAll({ raw: true });
};

exports.list = (page = 0, itemPerPage = 8) => {
	return models.products.findAndCountAll({
		include: [
			{
				model: models.images,
				as: "images",
				where: {
					image_stt: 1,
				},
			},
			{
				model: models.categories,
				as: "category",
			},
		],
		where: {
			is_active: true,
		},
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	});
};

exports.listByName = (search_name, page = 0, itemPerPage = 8) => {
	return models.products.findAndCountAll({
		include: [
			{
				model: models.images,
				as: "images",
				where: {
					image_stt: 1,
				},
			},
			{
				model: models.categories,
				as: "category",
			},
		],
		where: {
			product_name: {
				[Op.substring]: search_name,
			},
			is_active: true,
		},
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	});
};


exports.filterProduct = (parentCategory_id,subCategory_id,brand_id,page = 0, itemPerPage = 8 )=>{
	return models.products.findAndCountAll({
		include: [
			{
				model: models.images,
				as: "images",
				where: {
					image_stt: 1,
				},
			},
			{
				model: models.categories,
				as: "category",
				where: {
					parent_category: {[Op.in]: parentCategory_id},
					category_id: {[Op.in]:subCategory_id},
				}
			},
		],
		where: {
			category_id: {[Op.in]:subCategory_id},
			brand_id: {[Op.in]:brand_id},
			is_active: true,
		},
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	});
}
exports.addProduct = (product) => {
	return models.products.create(product);
}
