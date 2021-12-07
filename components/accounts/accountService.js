const {models} = require("../../models");
const { Op } = require("sequelize");
const { raw } = require("mysql");

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
