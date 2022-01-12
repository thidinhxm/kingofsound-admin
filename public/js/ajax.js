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