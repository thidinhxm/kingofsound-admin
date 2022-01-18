const { models } = require('../../models');
const bcrypt = require('bcrypt');
const { Op, fn, col, literal } = require('sequelize');

exports.listAdmins = (condition) => {
    const option = {
        subQuery: false,
        include: [{
            model: models.userroles,
            as: "userroles",
        }, {
            model: models.roles,
            as: 'role_id_roles',
        }],
        where: {
            '$userroles.role_id$': [1, 2],
        },
        raw: true
    }

    if (condition) {
        const page = condition.page || 1;
		const limit = parseInt(condition.limit) || 5;

        option.offset = (page - 1) * limit;
		option.limit = limit;

        if (condition.search_name) {
			option.where = {
                ...option.where,
                [Op.or]: [{
                    lastname: {
                        [Op.substring]: '%' + condition.search_name + '%',
                    }
                }, {
                    firstname: {
                        [Op.substring]: '%' + condition.search_name + '%',
                    }
                }]
            }
		}
        if (condition.sort) {
			if (condition.sort === "name_asc") {
				option.order = [
					["lastname", "ASC"],
				];
			}
			else if (condition.sort === "name_desc") {
				option.order = [
					["lastname", "DESC"],
				];
			}
		}

        if (condition.role) {
            option.where['$userroles.role_id$'] = condition.role;
        }
    }
    else {
        option.limit = 5;
		option.offset = 0;
    }
    return models.users.findAndCountAll(option);
}

exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}

exports.createAdminRole = (user_role) => {
    return models.userroles.create(user_role);
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

exports.lock = (id)=> {
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



exports.listUsers = (condition) => {
    const option = {
        subQuery: false,
        include: [{
            model: models.userroles,
            as: "userroles",
            attributes: [],
        }, {
            model: models.orders,
            as: 'orders',
            attributes: [],
        }],
        where: {
            '$userroles.role_id$': 3,
        },
        attributes: {
            include: [
                [fn('sum', literal('case when payment_status = "Đã thanh toán" then total_price else 0 end')), 'total_amount']
            ],
        },
        group: ['user_id'],
        raw: true,
    }
    if (condition) {
        const page = condition.page || 1;
		const limit = parseInt(condition.limit) || 5;

        option.offset = (page - 1) * limit;
		option.limit = limit;

        if (condition.search_name) {
			option.where = {
                ...option.where,
                [Op.or]: [{
                    lastname: {
                        [Op.substring]: '%' + condition.search_name + '%',
                    }
                }, {
                    firstname: {
                        [Op.substring]: '%' + condition.search_name + '%',
                    }
                }]
            }
		}
        if (condition.sort) {
			if (condition.sort === "price_asc") {
				option.order = [
					literal('sum(case when payment_status = "Đã thanh toán" then total_price else 0 end) ASC')
				];
			}
			else if (condition.sort === "price_desc") {
				option.order = [
                    literal('sum(case when payment_status = "Đã thanh toán" then total_price else 0 end) DESC')
                ];
			}
			else if (condition.sort === "name_asc") {
				option.order = [
					["lastname", "ASC"],
				];
			}
			else if (condition.sort === "name_desc") {
				option.order = [
					["lastname", "DESC"],
				];
			}
		}
    }
    else {
        option.limit = 5;
		option.offset = 0;
    }
    return models.users.findAndCountAll(option);
}