var $form = $(e.target);
var formData = new FormData();
formData.append('productsfile', $('#prdcttestfile')[0].files[0]);
$.ajax({
    url: '/product/movetoinventory',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
        if (response.success) {
            
        }
    }
});