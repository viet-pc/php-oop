// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: data // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

displayCart()
function displayCart() {
    let shoppingCart = JSON.parse(localStorage.getItem("cart_php")) || [];
    const el = document.getElementById("cart");
    el.innerHTML = `
                <tr class="table_head">
                    <th class="column-1">Product</th>
                    <th class="column-2"></th>
                    <th class="column-3">Price</th>
                    <th class="column-4">Quantity</th>
                    <th class="column-5">Total</th>
                </tr>`;
    for (let index = 0; index < shoppingCart.length; index++) {
        const element = shoppingCart[index];
        el.innerHTML += ``
        el.innerHTML += `
                 <tr class="table_row">
                        <td class="column-1">
                            <div class="how-itemcart1">
                                <img src="images/img-db/${element.hinh}" alt="IMG">
                            </div>
                        </td>
                        <td class="column-2">${element.ten_hh}</td>
                        <td class="column-3">$ ${element.don_gia}</td>
                        <td class="column-4">
                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                <div onclick="minus()" class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                </div>

                                <input class="mtext-104 cl3 txt-center num-product quantity" id="quantity"  type="number" name="num-product1" value="${element.quantity}">
                                <div class="d-none id">${element.ma_hh}</div>
                                <div onclick="plus()" class="btn-num-product-up  cl8 hov-btn3 trans-04 flex-c-m">
                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                </div>
                            </div>
                        </td>
                        <td class="column-5">$ ${element.don_gia * element.quantity}</td>
                    </tr>`
    }
    $(".quantity").change((e) => {

        let value = $(e.target).val();
        let regex = /^[0-9]+$/;
        if (!regex.test(value)) {
            e.target.value = 1;
        }
        if (value > 5) {
            e.target.value = 5;
        }
        if (value < 1) {
            e.target.value = 1;
        }
        const item = $(e.target).parents(".table_row");
        const idItem = item.find(".id").text();
        console.log(e.target.value);
        addToCart(idItem, true, e.target.value);
        // displayTotalCart();
        displayCart();
    });
}
function plus() {
    // Get the field name
    var quantity = parseInt($("#quantity").val());

    // If is not undefined

    $("#quantity").val(quantity + 1);

    // Increment
}
function minus() {
    // Get the field name
    var quantity = parseInt($("#quantity").val());

    // If is not undefined

    // Increment
    if (quantity > 0) {
        $("#quantity").val(quantity - 1);
    }
}

fetch("https://provinces.open-api.vn/api/?depth=3")
    .then(response => response.json())
    .then(data =>{
        let html =  `<option>Select a province...</option>`;
        data.forEach(value => {
            html += `<option value="${value.districtCode}">${value.name}</option>`;
        })
        $('#province').html(html);
    });
function displayTotalCart() {
    let shoppingCart = JSON.parse(localStorage.getItem("cart_php")) || [];
    const el = $('.header-cart-total').text();
    el.innerHTML = "";
    let totalPrice = 0;
    console.log(shoppingCart)
    shoppingCart.forEach((value) => {
        totalPrice += value.don_gia * value.quantity;
    });
    $('.header-cart-total').text("Total: $" + totalPrice)
    $('.mtext-110').text( totalPrice)
}
displayTotalCart()
let validatePhone = function(){
    let regex =   /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(!regex.test($('input[name="phone"]').val())){
        $('.err-phone').text('The phone number is not in the correct format')
        $('.err-phone').css('display', 'block')
        return false;
    }else{
        $('.err-phone').css('display', 'none')
        return true;
    }

}
let validateFullName = function(){
    let regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\W]+/

    if(!regex.test($('input[name="full_name"]').val())){
        $('.err-name').text('The name is not in the correct format')
        $('.err-name').css('display', 'block')
        return false;

    }else{
        $('.err-name').css('display', 'none')
        return true;
    }
}

let validateAddress = function(){
    let regex =   /[a-zA-Z]/g

    if(!regex.test($('input[name="address"]').val())){
        $('.err-address').text('The address is not in the correct format')
        $('.err-address').css('display', 'block')
        return false;

    }else{
        $('.err-address').css('display', 'none')
        return true;
    }
}
$('input[name="phone"]').change(function(){
    validatePhone()
})
$('input[name="full_name"]').change(function(){
    validateFullName()
})
$('input[name="address"]').change(function(){
    validateAddress()
})
console.log(Date.now());
$("#checkout").on('click',function(e){
    e.preventDefault();
    if (validateFullName()  && validatePhone() && validateAddress()){

        $.ajax({
            type: "POST",
            url: 'http://localhost:800/api/order',
            data:   {
                "address": $('input[name="address"]').val(),
                "phoneNumber": $('input[name="phone"]').val(),
                "recipientName": $('input[name="full_name"]').val(),
                "date": Date.now(),
                "total": $('#totalPrice').text(),
            }
        }).done(function() {
            alert( "Order Success " );
                localStorage.removeItem("cart_php");
                window.location.href = '/';
        })

    }
})