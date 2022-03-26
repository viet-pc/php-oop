displaySmallCart();
function displaySmallCart() {
    let shoppingCart = JSON.parse(localStorage.getItem("cart_php")) || [];
    const el = document.getElementById("cart-small");
    el.innerHTML = "";
    for (let index = 0; index < shoppingCart.length; index++) {
        const element = shoppingCart[index];
        el.innerHTML += `
               <li class="header-cart-item flex-w flex-t m-b-12">
                    <div class="header-cart-item-img">
                        <img src="images/img-db/${element.hinh}" alt="IMG">
                    </div>

                    <div class="header-cart-item-txt p-t-8">
                        <a href="/product-detail?id=${element.ma_hh}" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                            ${element.ten_hh}
                        </a>

                        <span class="header-cart-item-info">
								${element.quantity} x $${element.don_gia}
							</span>
                    </div>
                </li>`
    }
}
const fetchAPI = async (url, option) => {
    const res = await fetch(url, option);
    return res.json();
}
function addToCart(id, flag = true, quantity = 1){
    let shoppingCart = JSON.parse(localStorage.getItem("cart_php")) || [];
    let check = shoppingCart.filter((i) => i.ma_hh == id);
    if ($("#quantity").length) {
        quantity = $("#quantity").val();
        console.log($("#quantity").val());
    }
    if (check.length !== 0) {
        shoppingCart = shoppingCart.map((item) => {
            if (item.ma_hh == id) {
                if (quantity !== 1) {
                    item.quantity = quantity ;
                } else if (flag) {
                    item.quantity = Number(item.quantity + 1);
                } else {
                    item.quantity = Number(item.quantity - 1);
                }
            }
            return item;
        });
        console.log(shoppingCart)
    }else{
        fetch("api/product-detail?id=" + id)
            .then(response => response.json())
            .then(data =>{

                shoppingCart.push({ ...data, quantity: quantity });
                console.log(shoppingCart);
                displaySmallCart();
                localStorage.setItem("cart_php", JSON.stringify(shoppingCart));
                console.log(data)
            } );
    }

    localStorage.setItem("cart_php", JSON.stringify(shoppingCart));
    displaySmallCart();
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