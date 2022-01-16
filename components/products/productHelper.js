exports.paginateProductList = function (pagination) {
    let limit = 10, n;
    let page = parseInt(pagination.page);
    let leftText = '<i class="fa fa-chevron-left"></i>';
    let rightText = '<i class="fa fa-chevron-right"></i>';
    let paginationClass = 'pagination';

    let pageCount = pagination.pages || Math.ceil(pagination.totalRows / pagination.limit);
    let template = '<ul class="' + paginationClass + '" style="display: flex; justify-content: center;">';
    // ========= Previous Button ===============
    if (page === 1) {
        n = 1;

        template = template + `<li class="disabled page-item"><a onclick="changePage(${n}" class="page-link">${leftText}</a></li>`;
    }
    else {
        n = page - 1;
        template = template + `<li class="page-item"><a onclick="changePage(${n})" class="page-link">${leftText}</a></li>`;
    }
    // ========= Page Numbers Middle ======
    let leftCount = Math.ceil(limit / 2) - 1;
    let rightCount = limit - leftCount - 1;
    if (page + rightCount > pageCount) {
        leftCount = limit - (pageCount - page) - 1;
    }
    if (page - leftCount < 1) {
        leftCount = page - 1;
    }
    let start = page - leftCount;
    let i = 0;
    while (i < limit && i < pageCount) {
        n = start;
        if (start === page) {
            template = template + `<li class="active page-item"><a onclick="changePage(${n})" class="page-link">${n}</a></li>`;

        } else {
            template = template + `<li class="page-item"><a onclick="changePage(${n})" class="page-link">${n}</a></li>`;
        }
        start++;
        i++;
    }
    // ========== Next Buton ===========
    if (page === pageCount) {
        n = pageCount;
        template = template + `<li class="disabled page-item"><a onclick="changePage(${n})" class="page-link">${rightText}</a></li>`;
    }
    else {
        n = page + 1;
        template = template + `<li class="page-item"><a onclick="changePage(${n})" class="page-link">${rightText}</a></li>`;
    }
    template = template + '</ul>';
    return template;
};