const {models} = require('../../models');
const bcrypt = require('bcrypt');
var sequelize = require('sequelize');

exports.listAdminAccount = () => {
    return models.users.findAll({
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id: [1, 2]
            },
        },{
            model : models.roles,
            as : 'role_id_roles',
        }],
     raw : true} );
}

exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}

exports.createAdminRole = (user_role) => {
    return models.userroles.create(user_role);
}

exports.listUserAccount = () => {
    return models.users.findAll({
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id: 3
            },
        }],
     raw : true} );
}
exports.totalCredit = (userId) =>{
    // return models.orders.sum('total_credit',{where: {id: userId }})
    return models.orders.findAll({
        attributes: [
          'user_id',
          [sequelize.fn('sum', sequelize.col('order_total_price')), 'total_amount'],
        ],
        where: [
            {user_id: userId},
            {order_status: 'Đã giao'},
        ],
        group: ['user_id'],
        raw: true
      })
}


