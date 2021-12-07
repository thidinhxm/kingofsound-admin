const {models} = require('../../models');
const { Op } = require("sequelize");

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
    return   models.users.findAll({
        include: [{
            model: models.userroles,
            as: "userroles",
            where: {
                role_id:{
                    [Op.or]:[1,2]
                }
                },
        },{
            
                model : models.roles,
                as : 'role_id_roles',
        }],
     raw : true} ); 
}
