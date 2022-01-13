// $('#productCategory').on('change', function() {
//     const categoryId = $(this).find(':selected').val();
//     console.log('category:', categoryId);
//     console.log('adddddddddddddddd')
//     if(categoryId) {
//         $.ajax({
//             url: '/products/add/subCategories?category_id=' + categoryId,
//             type: "GET",
//             success:function(data) {
//                 $('#productSubCategory').empty();
//                 $('#productSubCategory').append('<option value="">Select Sub Category</option>');
//                 $.each(data, function(key, value) {
//                     console.log('key:', key);
//                     console.log('value:', value);
//                     $('#productSubCategory').append('<option value="'+ key +'">'+ value +'</option>');
//                 });
//             }
//         });
//     } else {
//         $('#product').empty();
//     }
// });

const getSubCategories = (selectInput) => {
    const categoryId = selectInput.value;
    console.log('category:', categoryId);
    console.log('adddddddddddddddd')
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
