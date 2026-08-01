function signup() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account Created Successfully!");

    window.location = "login.html";
}

function login() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (
        email === localStorage.getItem("email") &&
        password === localStorage.getItem("password")
    ) {

        alert("Login Successful!");

        window.location = "../index.html";

    } else {

        alert("Wrong Email or Password!");

    }

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addCart(name, price) {

    let exists = cart.find(item => item.name === name);

    if (exists) {
        alert(name + " is already in your cart.");
        return;
    }

    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

<div class="cart-card">

<h2>${item.name}</h2>

<h3>₹${item.price}</h3>

<p>Quantity : ${item.quantity}</p>

<button onclick="increaseQuantity(${index})">+</button>

<button onclick="decreaseQuantity(${index})">-</button>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

    });

    let totalElement = document.getElementById("total");

    if (totalElement) {

        totalElement.innerHTML = total;

    }

}
function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}
function updateCartCount() {

    let count = document.getElementById("cartCount");

    if (count) {
        count.innerHTML = cart.length;
    }

}
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}
// ---------------- Wishlist ----------------

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addWishlist(name, price) {

    let exists = wishlist.find(item => item.name === name);

    if (exists) {

        alert(name + " is already in your wishlist.");

        return;

    }

    wishlist.push({

        name: name,
        price: price

    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    alert(name + " added to Wishlist!");

}
function updateWishlistCount() {

    let count = document.getElementById("wishlistCount");

    if (count) {

        count.innerHTML = wishlist.length;

    }

}

function displayWishlist() {

    let div = document.getElementById("wishlistItems");

    if (!div) return;

    div.innerHTML = "";

    wishlist.forEach((item, index) => {

        div.innerHTML += `

<div class="wishlist-card">

<h2>${item.name}</h2>

<h3>₹${item.price}</h3>

<button onclick="moveToCart(${index})">

Move To Cart

</button>

<button onclick="removeWishlist(${index})">

Remove

</button>

</div>

`;

    });

}


function removeWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    displayWishlist();

}
function moveToCart(index){

let item=wishlist[index];

addCart(item.name,item.price);

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

displayWishlist();

updateWishlistCount();

}
// ====================== SEARCH ======================

function searchProduct() {

    let input = document.getElementById("search").value.toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(product => {

        let productName = product.querySelector("h3").innerText.toLowerCase();

        if (productName.includes(input)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}

// ================= CHECKOUT =================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function checkout(){

    if(cart.length==0){

        alert("Your cart is empty!");

        return;

    }

    window.location="checkout.html";

}

function placeOrder(){

    let name=document.getElementById("fullname").value.trim();

    let phone=document.getElementById("phone").value.trim();

    let address=document.getElementById("address").value.trim();

    let city=document.getElementById("city").value.trim();

    let state=document.getElementById("state").value.trim();

    let pin=document.getElementById("pincode").value.trim();

    let coupon=document.getElementById("coupon").value.trim();

    let payment=document.getElementById("payment").value;

    if(name=="" || phone=="" || address==""){

        alert("Please fill all details");

        return;

    }

    let subtotal=0;

    cart.forEach(item=>{

        subtotal+=item.price*item.quantity;

    });

    let gst=Math.floor(subtotal*0.18);

    let delivery=subtotal>1000?0:50;

    let discount=0;

    if(coupon==="SHOP10"){

        discount=Math.floor(subtotal*0.10);

    }

    let total=subtotal+gst+delivery-discount;

    orders.push({

        customer:name,

        phone:phone,

        address:address,

        city:city,

        state:state,

        pin:pin,

        payment:payment,

        subtotal:subtotal,

        gst:gst,

        delivery:delivery,

        discount:discount,

        total:total,

        items:[...cart],

        date:new Date().toLocaleString()

    });

    localStorage.setItem("orders",JSON.stringify(orders));

    cart=[];

    localStorage.removeItem("cart");

    updateCartCount();

    alert("Order Placed Successfully!");

    window.location="orders.html";

}
function displayOrders(){

    let div=document.getElementById("orders");

    if(!div) return;

    div.innerHTML="";

    if(orders.length==0){

        div.innerHTML="<h2>No Orders Yet</h2>";

        return;

    }

    orders.forEach(order=>{

        div.innerHTML+=`

<div class="order-card">

<h2>${order.customer}</h2>

<p>${order.address}</p>

<p><b>Payment :</b> ${order.payment}</p>

<p><b>Items :</b> ${order.items.length}</p>

<p><b>Subtotal :</b> ₹${order.subtotal}</p>

<p><b>GST :</b> ₹${order.gst}</p>

<p><b>Delivery :</b> ₹${order.delivery}</p>

<p><b>Discount :</b> ₹${order.discount}</p>

<h3>Total : ₹${order.total}</h3>

<p>${order.date}</p>

</div>

`;

    });

}

function displayProduct(){

let product=JSON.parse(localStorage.getItem("product"));

if(!product) return;

let name=document.getElementById("productName");

let price=document.getElementById("productPrice");

if(name) name.innerHTML=product.name;

if(price) price.innerHTML="₹"+product.price;

}
// ====================== FILTER ======================

function filterProduct(category){

let products=document.querySelectorAll(".product");

products.forEach(product=>{

if(category=="all"){

product.style.display="block";

}

else{

if(product.classList.contains(category)){

product.style.display="block";

}

else{

product.style.display="none";

}

}

});

}
// ====================== PRODUCT DETAILS ======================

function viewProduct(name,price){

let product={

name:name,

price:price

};

localStorage.setItem("product",JSON.stringify(product));

window.location="pages/product.html";
}
function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("email");

        localStorage.removeItem("password");

        alert("Logged Out Successfully");

        window.location="login.html";

    }

}
function showRating(stars){

let rating=document.getElementById("rating");

if(rating){

rating.innerHTML="⭐".repeat(stars);

}

}
function changeImage(image){

let main=document.getElementById("mainImage");

if(main){

main.src=image;

}

}
function quickView(name,price){

alert(

"Product : "+name+

"\nPrice : ₹"+price

);

}
function darkMode(){

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

);

}
window.addEventListener("load",()=>{

if(localStorage.getItem("theme")=="true"){

document.body.classList.add("dark");

}

});
// ================= PROFILE =================

function loadProfile(){

    let name=document.getElementById("userName");

    let email=document.getElementById("userEmail");

    if(name){

        name.innerHTML=localStorage.getItem("name");

    }

    if(email){

        email.innerHTML=localStorage.getItem("email");

    }

}
function calculateTotal(){

    let total=0;

    cart.forEach(item=>{

        total+=item.price*item.quantity;

    });

    return total;

}
function clearCart(){

    if(confirm("Clear cart?")){

        cart=[];

        localStorage.removeItem("cart");

        updateCartCount();

        displayCart();

    }

}
function clearWishlist(){

    if(confirm("Clear wishlist?")){

        wishlist=[];

        localStorage.removeItem("wishlist");

        updateWishlistCount();

        displayWishlist();

    }

}