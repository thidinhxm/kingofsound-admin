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

const paginateList = function (pagination, functionName) {
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
        template = template + `<li class="disabled page-item"><a onclick="${functionName}(${n}" class="page-link">${leftText}</a></li>`;
    }
    else {
        n = page - 1;
        template = template + `<li class="page-item"><a onclick="${functionName}(${n})" class="page-link">${leftText}</a></li>`;
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
            template = template + `<li class="active page-item"><a onclick="${functionName}(${n})" class="page-link">${n}</a></li>`;

        } else {
            template = template + `<li class="page-item"><a onclick="${functionName}(${n})" class="page-link">${n}</a></li>`;
        }
        start++;
        i++;
    }
    // ========== Next Buton ===========
    if (page === pageCount) {
        n = pageCount;
        template = template + `<li class="disabled page-item"><a onclick="${functionName}(${n})" class="page-link">${rightText}</a></li>`;
    }
    else {
        n = page + 1;
        template = template + `<li class="page-item"><a onclick="${functionName}(${n})" class="page-link">${rightText}</a></li>`;
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
                $('#pagination-product').html(paginateList(data.pagination, 'changePage'));
                return true;
            }
            else {
                return false;
            }
        }
    });
}

const checkValidPassword = function (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
const checkPassword = function()
{
    const password =  $("#oldpassword").val();
    const newpassword =  $("#newpassword").val();
    const renewpassword =  $("#renewpassword").val();
    if(!newpassword || !password || !renewpassword)
        {
        $("#change-password-error").removeAttr('class');
         $("#change-password-error").attr('class', 'alert alert-danger');
          $("#change-password-error").text("Vui lòng nhập đầy đủ thông tin!");
        }
    else if(newpassword != renewpassword)
    {
        $("#change-password-error").removeAttr('class');
        $("#change-password-error").attr('class', 'alert alert-danger');
         $("#change-password-error").text("Mật khẩu mới không khớp!");
    }
    else if (!checkValidPassword(newpassword)) {
        $("#change-password-error").removeAttr('class');
        $("#change-password-error").attr('class', 'alert alert-danger');
        $("#change-password-error").text('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
    }
    else 
    {
        $("#change-password-error").removeAttr('class');
        $("#change-password-form").submit();
    }
}

const getUserListTemplate = function () {
    return `{{#each users}}
    <tr>
        <th scope="row"><b>{{user_id}}</b></th>
        <td><b>{{firstname}} {{lastname}}</b></td>
        <td><b>{{phone}}</b></td>
        <td><b>{{total_amount}}</b></td>
        <td>
            {{#if is_blocked}}
            <a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                data-target="#unlock-product-modal" data-id="{{user_id}}">
                <i class="fas fa-lock tm-product-delete-icon"></i>
            </a>
            {{else}}
            <a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                data-target="#lock-product-modal" data-id="{{user_id}}">
                <i class="fas fa-unlock tm-product-delete-icon"></i>
            </a>
            {{/if}}
        </td>
        <td>
            <a href="/accounts/users/{{user_id}}" class=" tm-product-delete-link">
                <i class="far fa-eye tm-product-delete-icon"></i>
            </a>
        </td>
    </tr>
    {{/each}}`
}
const changePageUser = function(page) {
    const search_name = $('#search_user').val();
    const sort = $('#sort-user').val();
    const limit = $('#limit-user').val();
    $.ajax({
        url: '/accounts/paginate-user',
        type: 'POST',
        data: {
            search_name: search_name,
            sort: sort,
            limit: limit,
            page: page
        },
        success: function (data) {
            if (data.success) {
                let userListTemplate = Handlebars.compile(getUserListTemplate());
                $('#user-list').html(userListTemplate({users: data.users}));
                $('#pagination-user').html(paginateList(data.pagination, 'changePageUser'));
                return true;
            }
            else {
                return false;
            }
        }
    });
}

const compileTemplateAdmin = (admins, user_id) => {
    let html = '';
    admins.forEach(admin => {
        html += `<tr>
        <td class="tm-product-name">${admin.user_id}</td>
        <td>${admin.firstname} ${admin.lastname}</td>
        <td>${admin.address}</td>
        <td>${admin.phone}</td>
        <td>${admin.email}</td>
        <td>${admin['role_id_roles.role_name']}</td>
        <td>
            <a href="/accounts/admin/${admin.user_id}" class=" tm-product-delete-link">
                <i class="far fa-eye tm-product-delete-icon"></i>
            </a>
        </td>

        <td>`;
        if (admin.is_blocked) {
            if (user_id != 1) {
                html += `<a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                data-target="#prevent-lock-unlock-admin-modal" data-id="${admin.user_id}">
                <i class="fas fa-lock tm-product-delete-icon"></i>
            </a>`;
            }
            else {
                html += `<a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                data-target="#unlock-product-modal" data-id="${admin.user_id}">
                <i class="fas fa-lock tm-product-delete-icon"></i>
            </a>`;
            }
        }
        else {
            if (user_id != 1) {
                html += `<a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                data-target="#prevent-lock-unlock-admin-modal">
                <i class="fas fa-unlock tm-product-delete-icon"></i>
            </a>`;
            }
            else {
                if (admin.user_id != 1) {
                    html += `<a href="#" class="tm-product-delete-link btn-danger"
                    data-toggle="modal" data-target="#lock-product-modal" data-id="${admin.user_id}">
                    <i class="fas fa-unlock tm-product-delete-icon"></i>
                </a>`;
                }
                else {
                    html += `<a href="" class="tm-product-delete-link btn-danger" data-toggle="modal"
                    data-target="#prevent-lock-yourself-modal" data-id="${admin.user_id}">
                    <i class="fas fa-unlock tm-product-delete-icon"></i>
                </a>`;
                }
            }
        }
    });
    return html;
}
const changePageAdmin = function(page) {
    const search_name = $('#search_admin').val();
    const sort = $('#sort-admin').val();
    const limit = $('#limit-admin').val();
    const role = $('#role-admin').val();
    const admin_id = $('#hidden-id').val();

    $.ajax({
        url: '/accounts/paginate-admin',
        type: 'POST',
        data: {
            search_name: search_name,
            sort: sort,
            limit: limit,
            role: role,
            page: page
        },
        success: function (data) {
            if (data.success) {
                $('#admin-list').html(compileTemplateAdmin(data.admins, admin_id));
                $('#pagination-admin').html(paginateList(data.pagination, 'changePageAdmin'));
                return true;
            }
            else {
                return false;
            }
        }
    });
}

const getOrderListTemplate = () => {
    return `{{#each orders}}
    <tr>
        <th scope="row"><b>{{order_id}}</b></th>
        <td><b>{{'user.firstname'}} {{'user.lastname'}}</b></td>
        <td><b>{{'user.phone'}}</b></td>
        <td><b>{{totalString}}</b></td>
        <td>{{order_status}}</td>
        <td><b>{{createDateFormat}}</b></td>

        <td>
            <a href="/orders/{{order_id}}/edit" class="tm-product-delete-link">
                <i class="far fa-edit tm-product-delete-icon"></i>
            </a>
        </td>
    </tr>
    {{/each}}`
}
const changePageOrder = function(page) {
    const search_name = $('#search_order').val();
    const sort = $('#sort-order').val();
    const limit = $('#limit-order').val();
    const type = $('#type-order').val();
    $.ajax({
        url: '/orders/paginate',
        type: 'POST',
        data: {
            search_name: search_name,
            sort: sort,
            limit: limit,
            type: type,
            page: page
        },
        success: function (data) {
            if (data.success) {
                let productListTemplate = Handlebars.compile(getOrderListTemplate());
                $('#order-list').html(productListTemplate({orders: data.orders}));
                $('#pagination-order').html(paginateList(data.pagination, 'changePageOrder'));
                return true;
            }
            else {
                return false;
            }
        }
    });
};

const updateOrder = function(order_id) {
    const order_status = $('#order_status').val();
    const payment_status = $('#payment_status').val();
    
    $.ajax({
        url: '/orders/' + order_id + '/update',
        type: 'POST',
        data: {
            order_status: order_status,
            payment_status: payment_status
        },
        success: function (data) {
            if (data.success) {
                $('order_status').val(order_status);
                $('payment_status').val(payment_status);
                $('#order-update-modal').modal('show');

                return true;
            }
            else {
                return false;
            }
        }
    });
}

const checkExistVoucher = function (voucher_code) {
    if (voucher_code != "")
        $.ajax({
            url: '/vouchers/check-exist',
            type: 'POST',
            data: {
                voucher_id: voucher_code,
            },
            success: function (data) {
                if (!data) {
                    $('#voucher-success').text("Mã khuyến mãi hợp lệ");
                    $('#voucher-error').text("");
			        $('#submit-check-voucher').removeAttr("disabled")
                    return true;
                }
                else {
                    $('#voucher-error').text('Mã khuyến mại "' + voucher_code + '" đã tồn tại!');
                    $('#voucher-success').text("");
                    $('#submit-check-voucher').attr("disabled", "disabled");
                    return false;
                }
            }
        });
    else {
        $('#voucher-error').text("");
        $('#voucher-success').text("");
        $('#submit-check-voucher').attr("disabled", "disabled");
    }
};

const getVoucherListTemplate = () => {
    return `{{#each vouchers}}
    <tr>
        <td>{{voucher_id}}</td>
        <td class="">{{discount}} %</td>
        <td>{{start_date}}</td>
        <td>{{end_date}}</td>
        <td>
            <a href="/vouchers/{{voucher_id}}/edit" class=" tm-product-delete-link">
                <i class="far fa-edit tm-product-delete-icon"></i>
            </a>
        </td>
    </tr>
    {{/each}}`;
}
const changePageVoucher = function(page) {
    const search_name = $('#search_voucher').val();
    const sort = $('#sort-voucher').val();
    const limit = $('#limit-voucher').val();
    const type = $('#type-voucher').val();
    $.ajax({
        url: '/vouchers/paginate',
        type: 'POST',
        data: {
            search_name: search_name,
            sort: sort,
            limit: parseInt(limit),
            page: page,
            type: type
        },
        success: function (data) {
            if (data.success) {
                let voucherListTemplate = Handlebars.compile(getVoucherListTemplate());
                $('#voucher-list').html(voucherListTemplate({vouchers: data.vouchers}));
                $('#pagination-voucher').html(paginateList(data.pagination, 'changePageVoucher'));
                return true;
            }
            else {
                return false;
            }
        }
    });
}

function drawBarChartRevenue(data) {
	const width_threshold = 480;
	if ($("#barChart").length) {
		ctxBar = document.getElementById("barChart").getContext("2d");
		optionsBar = {
			responsive: true,
			scales: {
				yAxes: [
					{
						barPercentage: 0.2,
						ticks: {
							beginAtZero: true
						},
						scaleLabel: {
							display: true,
							labelString: "Doanh thu theo từng tháng"
						}
					}
				]
			}
		};

		optionsBar.maintainAspectRatio =
			$(window).width() < width_threshold ? false : true;
		configBar = {
			type: "horizontalBar",
			data: {
				labels: data.map(item => `Tháng ${item.month}`),
				datasets: [
					{
						label: "Doanh thu",
						data: data.map(item => item.totalRevenue),
						backgroundColor: [
							"#F7604D", "#4ED6B8", "#A8D582", "#D7D768", "#9D66CC", "#DB9C3F",
							"#3889FC", "#F7604D", "#4ED6B8", "#A8D582", "#D7D768", "#9D66CC",
						],
						borderWidth: 0
					}
				]
			},
			options: optionsBar
		};

		barChart = new Chart(ctxBar, configBar);
	}
}

const changeRevenueByYear = () => {
    const year = $('#year-revenue').val();
    $.ajax({
        url: `/revenue/revenue-by-year`,
        type: 'GET',
        data: {
            year: year
        },
        success: function (data) {
            if (data.success) {
                drawBarChartRevenue(data.revenueMonths);
                $('#total-revenue').text(`Doanh thu: ${data.totalInYear} vnđ`);
                return true;
            }
            else {
                return false;
            }
        }
    });
}