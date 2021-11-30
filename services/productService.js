const {models} = require("../models");
const { options } = require("../routes");
const { Op } = require("sequelize");
exports.listcategory = () =>
{
    return models.categories.findAll({raw:true});
}
exports.list = (page = 0, itemPerPage = 8) =>
{
    return models.products.findAndCountAll({
        include : [{
            model : models.images,
            as : 'images',
            where : {
                image_stt: 1
            },
        },{
            model : models.categories,
            as : 'category',
        }],
        where:{
            isActive:true
        },
        raw : true
        ,offset:page*itemPerPage,limit:itemPerPage
    });
}

exports.listByName = (search_name,page = 0, itemPerPage = 8) =>
{
    
    return models.products.findAndCountAll({
        include : [{
            model : models.images,
            as : 'images',
            where : {
                image_stt: 1
            },
        },{
            model : models.categories,
            as : 'category',
        }],
        where:
        {
            product_name:{
                [Op.substring]:search_name 
            },
            isActive:true
        }
        ,
        raw : true
        ,offset:page*itemPerPage,limit:itemPerPage
    });
}

