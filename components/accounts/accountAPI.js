const accountService = require("./accountService");

exports.getUserPaginate = async (req, res, next) => {
    try {
        const { search_name, sort, page, limit } = req.body;
        const usersRowAndCount = await accountService.listUsers({ search_name, sort, page, limit });
        if (usersRowAndCount) {
            const pagination = {
                page: parseInt(page),
                limit: parseInt(limit) || 5,
                totalRows: usersRowAndCount.count.length,
                pages: Math.ceil(usersRowAndCount.count.length / (limit || 5)) || 1
            }
            res.json({
                users: usersRowAndCount.rows,
                success: true,
                pagination: pagination
            });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (err) {
        next(err);
    }
}

exports.getAdminPaginate = async (req, res, next) => {
    try {
        const { search_name, sort, page, limit, role } = req.body;
        const adminsRowAndCount = await accountService.listAdmins({ search_name, sort, page, limit, role });
        if (adminsRowAndCount) {
            const pagination = {
                page: parseInt(page),
                limit: parseInt(limit) || 5,
                totalRows: adminsRowAndCount.count,
                pages: Math.ceil(adminsRowAndCount.count / (limit || 5)) || 1
            }
            res.json({
                admins: adminsRowAndCount.rows,
                success: true,
                pagination: pagination
            });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (err) {
        next(err);
    }
}