const getSubCategories = (selectInput) => {
    const categoryId = selectInput.value;
    if(categoryId) {
        $.ajax({
            url: '/products/add/subCategories?category_id=' + categoryId,
            type: "GET",
            success:function(data) {
                console.log(data);
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

$('#submit-check-voucher').click = function(e){
    e.preventDefault();
    console.log("OKkkkkkkkkkkkkkkkkkkkkkk")
    const id = $('#voucher_code').val().trim();
    console.log(id)
    return ;
    if (id != "")
        $.ajax({
            url: '/vouchers/check-voucher',
            type: 'post',
            data: {
                voucher_id: id,
            },
            success: function (data) {
                if (data) {
                    $('#voucher-error').text("Mã khuyến mại đã tồn tại");
                    $('#voucher-success').text("");
                    return false;
                }
                else {
                    $('#voucher-success').text('Hợp lệ');
                    $('#voucher-error').text("");
                    $('#add-voucher-form').submit();
                    return true
                }
            }
        });
    else {
        $('#voucher-error').text("");
        $('#voucher-success').text("");
    }

};
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
