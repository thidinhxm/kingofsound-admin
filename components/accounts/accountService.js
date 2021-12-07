const {models} = require('../../models');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
exports.getAdminByEmail = (email) => {
    return models.users.findOne({
        where: {
            email: email,
            is_blocked: false,
        },
        include: [{
            model: models.userroles,
            as: 'userroles',
            attributes: [],
            where: {
                role_id: [1, 2]
            }
        }],
        raw: true
})};


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
