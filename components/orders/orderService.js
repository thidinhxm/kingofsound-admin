const {models} = require('../../models');

exports.getOrders = (req, res) => {
    return models.orders.findAll({
        attribute: [],
        include: [{
            model: models.users,
            as: 'user',
            attributes: ['firstname', 'lastname', 'email', 'address', 'phone']
        }],
        raw: true
    });
}