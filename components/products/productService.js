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

exports.addProduct = (product) => {
	return models.products.create(product);
}

exports.getProductSuggest = (search_name) =>
{
    return models.products.findAll({
        attributes:['product_name','product_id'],
        where:{
            product_name:
            {
                [Op.substring]:search_name
            }
        },
        raw:true,
        limit:10
    })
}