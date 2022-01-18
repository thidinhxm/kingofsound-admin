const { models } = require("../../models");
const { Op } = require("sequelize");

exports.listProducts = () => {
	return models.products.findAll({ raw: true });
};

exports.list = (condition) => {
	const option = {
		include: [{
			model: models.images,
			as: "images",
			where: {
				image_stt: 1,
			},
		}, {
			model: models.categories,
			as: "category",
		}],
		subQuery: false,
		where: {
			is_active: true,
		},
		raw: true
	};

	if (condition) {
		const page = condition.page || 1;
		const limit = parseInt(condition.limit) || 9;

		option.offset = (page - 1) * limit;
		option.limit = limit;

		if (condition.search_name) {
			option.where.product_name = {
				[Op.like]: `%${condition.search_name}%`,
			};

		}

		if (condition.brand_id) {
			option.where.brand_id = condition.brand_id;
		}

		if (condition.category_id) {
			option.where['$category.parent_category$'] = condition.category_id;
		}
		if (condition.sort) {
			if (condition.sort === "price_asc") {
				option.order = [
					["price", "ASC"],
				];
			}
			else if (condition.sort === "price_desc") {
				option.order = [
					["price", "DESC"],
				];
			}
			else if (condition.sort === "name_asc") {
				option.order = [
					["product_name", "ASC"],
				];
			}
			else if (condition.sort === "name_desc") {
				option.order = [
					["product_name", "DESC"],
				];
			}
			else if (condition.sort === "model_year") {
				option.order = [
					["model_year", "ASC"],
				];
			}
		}
	}
	else {
		option.limit = 9;
		option.offset = 0;
	}
	return models.products.findAndCountAll(option);
};

exports.addProduct = (product) => {
	return models.products.create(product);
}

exports.getProductSuggest = (search_name) => {
	return models.products.findAll({
		attributes: ['product_name', 'product_id'],
		where: {
			product_name:
			{
				[Op.substring]: search_name
			}
		},
		raw: true,
		limit: 10
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

exports.deleteProductsOfCategory = (categoryID) => {
	return models.products.update({ 
		is_active: false 
	},{
		where: { category_id : categoryID }
	})
}

exports.deleteProductsOfBrand = (brandID) => {
	return models.products.update({ 
		is_active: false 
	}, {
		where: { brand_id: brandID }
	})
}