const {models} = require('../../models');

exports.listBrands = () => {
    return models.brands.findAll({
        attributes: ['brand_name', 'brand_id'],
        order: [
            ['brand_name', 'ASC']
        ],
        raw: true
    });
}

exports.getBrand = async (id) => {
    return models.brands.findOne({
        attributes: ['brand_name', 'brand_id'],
        where: {
            brand_id: id
        },
        raw: true
    });
}