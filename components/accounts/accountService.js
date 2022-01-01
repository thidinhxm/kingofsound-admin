const { models } = require('../../models');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.listAdminAccount = () => {
    return models.users.findAll({
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id: [1, 2]
            },
        }, {
            model: models.roles,
            as: 'role_id_roles',
        }],
        raw: true
    });
}

exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}

exports.createAdminRole = (user_role) => {
    return models.userroles.create(user_role);
}

// exports.listUserAccount = () => {
//     return models.users.findAll({
//         include: [{
//             model: models.userroles,
//             as: "userroles",
//             where: {
//                 role_id: 3
//             },
//         }],
//         raw: true
//     });
// }
exports.totalCredit = (userId) => {
    // return models.orders.sum('total_credit',{where: {id: userId }})
    return models.orders.findAll({
        attributes: [
            'user_id',
            [sequelize.fn('sum', sequelize.col('total_price')), 'total_amount'],
        ],
        where: [
            { user_id: userId },
            { order_status: 'Đã giao' },
        ],
        group: ['user_id'],
        raw: true
    })
}
exports.userRole = async (id) => {
    try {
        const roleUserID = 3
        const userRole = await models.userroles.findOne({
            where: {
                user_id: id,
            },
            raw: true
        })
        return userRole.role_id == roleUserID ? 'users' : 'admins'
    }
    catch (err) {
        console.log(err)
    }

}
exports.listUserPage = (page = 0, itemPerPage = 8) => {
    return models.users.findAndCountAll({
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id: 3
            },
        }],
        raw: true,
        offset: page * itemPerPage,
        limit: itemPerPage,
    });
};

exports.listByUsername = (search_name, page = 0, itemPerPage = 8) => {
    return models.users.findAndCountAll({
        where: {
            [sequelize.Op.or]: [
                {
                    firstname: {
                        [Op.substring]: '%' + search_name + '%',
                    }
                },
                {
                    lastname: {
                        [Op.substring]: '%' + search_name + '%',
                    }
                },
            ]
        },
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id: 3
            },
        }],
        raw: true,
        offset: page * itemPerPage,
        limit: itemPerPage,
    });
};



