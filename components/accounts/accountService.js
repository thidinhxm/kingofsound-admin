const {models} = require('../../models');
const bcrypt = require('bcrypt');

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
