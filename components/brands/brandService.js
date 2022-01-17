const { models } = require('../../models');

exports.listBrands = () => {
    return models.brands.findAll({
        attributes: ['brand_name', 'brand_id', 'address'],
        order: [
            ['brand_id', 'ASC']
        ],
        where: {
            is_active: true,
        },
        raw: true
    });
}
exports.getBrand = (id) => {
    if (isNaN(id)) {
        return false;
    }

    else {
        return models.brands.findOne({
            where: {
                brand_id: id
            },
            raw: true
        });
    }
}

exports.createBrand = (brand) => {
    return models.brands.create(brand)
}


exports.deleteBrand = (id) => {
    return models.brands.update({
		is_active: false },
        {
            where: {
                brand_id: id
            }
	})
}