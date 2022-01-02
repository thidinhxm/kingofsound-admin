const {models} = require('../../models');
const {Op} = require('sequelize');

exports.listbrand = () => {
    return models.brands.findAll({raw: true,});
};