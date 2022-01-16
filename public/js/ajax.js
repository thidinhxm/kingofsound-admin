const getSubCategories = (selectInput) => {
    const categoryId = selectInput.value;
    if(categoryId) {
        $.ajax({
            url: '/products/add/subCategories?category_id=' + categoryId,
            type: "GET",
            success:function(data) {
                const selectSubcategory = $('#productSubCategory');
                selectSubcategory.empty();
                selectSubcategory.append('<option value="">-- Chọn --</option>');
                $.each(data, function(key, value) {
                    selectSubcategory.append('<option value="'+ value.category_id +'">'+ value.category_name +'</option>');
                });
            }
        });
    } else {
        selectInput.empty();
    }
}


// suggest search
const suggest = function(search){
	$('#search-suggest').empty();
	if (search== ""){return;}
	$.ajax({
        url: '/products/suggest',
        type: 'POST',
        data: {
            search_name: search
        },
        success: function (data) {
            if (data.success) {
                data.products.forEach(value=>{
                    $('#search-suggest').append(`<a href="/products?search_name=${value.product_name}"><div class="text">${value.product_name}</div></a>`);
                })
                return true;
            }
            else
            return false;
        }
    });
}

const paginateProductList = function (pagination) {
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

const changePage = function(page) {
    const search_name = $('#search_name').val();
    const category_id = $('#category').val();
    const brand_id = $('#brand').val();
    const sort = $('#sort').val();
    const limit = $('#limit').val();
    $.ajax({
        url: '/products/paginate',
        type: 'POST',
        data: {
            search_name: search_name,
            category_id: category_id,
            brand_id: brand_id,
            sort: sort,
            limit: limit,
            page: page
        },
        success: function (data) {
            if (data.success) {
                let productListTemplate = Handlebars.compile($('#product-list-template').html());
                $('#product-list').html(productListTemplate({products: data.products}));
                $('#pagination-product').html(paginateProductList(data.pagination));
                return true;
            }
            else
            return false;
        }
    });
}
