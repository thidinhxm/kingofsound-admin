const {models} = require('../../models');

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

exports.updateProfile = (id, profile) => {
    return models.users.update(profile, {
        where: {
            user_id: id
        }
    })
}