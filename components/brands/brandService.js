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
