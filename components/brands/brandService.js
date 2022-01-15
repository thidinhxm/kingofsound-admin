const { models } = require('../../models');

exports.listBrands = () => {
    return models.brands.findAll({
        attributes: ['brand_name', 'brand_id'],
        order: [
            ['brand_name', 'ASC']
        ],
        raw: true
    });
}
exports.getBrand = (id) => {
    if (isNaN(id)){
        console.log("Not have brand id: " + id )
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
