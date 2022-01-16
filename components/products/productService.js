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

exports.getProductSuggest = (search_name) => {
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

exports.getProductById = (product_id) => {
	return models.products.findOne({
		where: {
			product_id,
		},
		raw: true,
	});
}

exports.lockProduct = (product_id) => {
	return models.products.update({
		is_active: false,
	}, {
		where: {
			product_id,
		},
	});
}

exports.getImagesProduct = (product_id) => {
	return models.images.findAll({
		where: {
			product_id,
		},
		raw: true,
	});
}

exports.createImageProduct = (imageProduct) => {
	return models.images.create(imageProduct);
}

exports.updateImageProduct = (product_id, image_stt, image_link) => {
	return models.images.update(
		{
			image_link,
		},
		{
			where: {
				product_id,
				image_stt
			},
		}
	);
}

exports.updateProduct = (product) => {
	return models.products.update(product, {
		where: {
			product_id: product.product_id,
		},
	});
}

exports.getTop10Products = () => {
	return models.products.findAll({
		include: [{
			model: models.images,
			as: "images",
			where: {
				image_stt: 1,
			},
		}],
		where: {
			is_active: true,
		},
		order: [
			["number_of_sales", "DESC"],
		],
		raw: true,
		limit: 10,
	});
}
