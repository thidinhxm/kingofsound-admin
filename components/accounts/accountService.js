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

exports.totalCredit = (userId) => {
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

exports.lock = (id)=>{
    return models.users.update(
        {
            is_blocked: true
        }, {
        where: {
            user_id: id,
        }
    })
}

exports.unlock = (id)=>{
    return models.users.update(
        {
            is_blocked: false
        }, {
        where: {
            user_id: id,
        }
    })
}

exports.getUserById = (id) => {
    return models.users.findOne({
        where: {
            user_id: id,
        },
        raw: true,
    });
}



exports.listUser = () => {
    return models.users.findAll({
        subQuery: false,
        include: [{
            model: models.userroles,
            as: "userroles",
            attributes: [],
        }, {
            model: models.orders,
            as: 'orders',
            attributes: [],
            raw: true
        }],
        where: {
            '$userroles.role_id$': 3,
            '$orders.payment_status$': 'Đã thanh toán'
        },
        attributes: [
            'user_id', 'firstname', 'lastname', 'email', 'phone', 'address', 
            [sequelize.fn('sum', sequelize.col('orders.total_price')), 'total_amount']
        ],
        group: ['user_id', 'firstname', 'lastname', 'email', 'phone', 'address'],
        raw: true,
    });
}