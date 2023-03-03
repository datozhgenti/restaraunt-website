const burger_btn = document.querySelector('.burger_btn');
const responsive_nav = document.querySelector('.responsive_nav');
let navOn = false;



burger_btn.addEventListener('click', function() {
    navOn = !navOn;

    if (navOn) {
        responsive_nav.style.display = "block";
    } else {
        responsive_nav.style.display = "none";
    }


});


const cart_btn = document.querySelector('.cart_btn');
const cart = document.querySelector('.cart');
const cartCloseBtn = document.querySelector(".close_btn");
const darken_page = document.querySelector('.darken');
const addToCartBtn = document.querySelectorAll(".cartquantity button");
const productImg = document.querySelectorAll(".menu_picture img");
const productName = document.querySelectorAll(".priceName h6");
const productPrice = document.querySelectorAll(".priceName p");
const productQuantity = document.querySelectorAll(".cartquantity input");
const cartFooter = document.querySelector(".cart_footer");
const cartContentDefault = document.querySelector(".cart_content");
const cartContentArea = document.querySelector(".cart_content_area");
const cartCount = document.querySelector(".cart_btn span");
const totalPrice = document.querySelector(".total_price");
let removeBtn = undefined;
let counter = 0;




if (localStorage.getItem('cartItems') === null) {
    var productsInCart = [];
} else {
    var productsInCart = JSON.parse(localStorage["cartItems"]);
    defaulCartStyleChange(1);

    for (let i = 0; i < productsInCart.length; i++) {
        productsInCart[i].quantity = Number(productsInCart[i].quantity);
    }

    addToCart(productsInCart);

    const cartItemPrice = document.querySelectorAll(".cart_item_price");
    totalPrice.innerText = `$ ${subtotal(productsInCart,cartItemPrice)} USD`;


    cartCount.innerText = cartProductsCount(productsInCart);

    removeBtn = document.querySelectorAll(".cart_item_removeBtn");
    removeFromCart(removeBtn);

}


cart_btn.addEventListener('click', function(e) {
    cart.style.right = "0";
    darken_page.style.display = "block";

    if (e.isTrusted === false) {
        removeBtn = document.querySelectorAll(".cart_item_removeBtn");
        removeFromCart(removeBtn);

    }

    const cartItemPrice = document.querySelectorAll(".cart_item_price");
    cartInputChange(cartItemPrice);

});

cartCloseBtn.addEventListener('click', function() {
    cart.style.right = "-500px";
    darken_page.style.display = "none";
});

darken_page.addEventListener('click', function() {
    cart.style.right = "-500px";
    this.style.display = "none";
});


const questionBtn = document.querySelectorAll('.quest');
const answerOn = [];
const questIcon = document.querySelectorAll('.icon');


questionBtn.forEach(function(value, index, questionBtn) {
    answerOn.push(false);
    questionBtn[index].addEventListener('click', function() {

        answerOn[index] = !answerOn[index];

        if (answerOn[index]) {
            questionBtn[index].lastElementChild.style.display = "block";
            questIcon[index].classList.add("icon_rotate");
        } else {
            questionBtn[index].lastElementChild.style.display = "none";
            questIcon[index].classList.remove("icon_rotate");
        }
    });
});













class Product {
    constructor(image, name, price, quantity) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

addToCartBtn.forEach(function(value, index, addToCartBtn) {
    addToCartBtn[index].addEventListener("click", function() {

        if (localStorage.getItem('cartItems') === null) {
            productsInCart.push(new Product(productImg[index].src,
                productName[index].innerText, productPrice[index].innerText,
                Number(productQuantity[index].value)));

        } else if (localStorage.getItem('cartItems') !== null) {
            let product = new Product(productImg[index].src,
                productName[index].innerText, productPrice[index].innerText,
                Number(productQuantity[index].value));

            let productExists = productsInCart.findIndex(function(value) {
                return value.name === product.name;
            });

            if (productExists === -1) {
                productsInCart.push(product);
            } else {
                productsInCart[productExists].quantity += product.quantity;
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(productsInCart));
        defaulCartStyleChange(1);



        addToCart(productsInCart);

        cartCount.innerText = cartProductsCount(productsInCart);


        const cartItemPrice = document.querySelectorAll(".cart_item_price");
        totalPrice.innerText = `$ ${subtotal(productsInCart,cartItemPrice)} USD`;


        removeBtn = document.querySelectorAll(".cart_item_removeBtn");
        removeFromCart(removeBtn);

        cartInputChange(cartItemPrice);



        cart.style.right = "0";
        darken_page.style.display = "block";








    });
});

function defaulCartStyleChange(on) {
    if (on === 1) {
        cartFooter.style.display = "flex";
        cartContentDefault.style.display = "none";
        cartContentArea.style.padding = "15px";
        cartContentArea.style.display = "block";
    } else {
        cartFooter.style.display = "none";
        cartContentDefault.style.display = "flex";
        cartContentArea.style.padding = "100px 0";
        cartContentArea.style.display = "flex";
        cartContentArea.innerHTML += ` <div class="cart_content">
    <p class="cart_default_text">We couldn't find any items in your cart.</p>
    <a href="order.html" class="wavebtn cart_wavebtn">Start an Order</a>
    </div>`;
    }

};

function addToCart(productsInCart) {
    cartContentArea.innerHTML = "";
    for (let i = 0; i < productsInCart.length; i++) {
        cartContentArea.innerHTML += `<div class="cart_item">
            <div class="cart_item_img_area">
                 <img class="cart_item_img" src="${productsInCart[i].image}" alt="">
             </div>
             <div class="cart_item_text">
                 <p class="cart_item_name">${productsInCart[i].name}</p>
                 <p class="cart_item_price">${productsInCart[i].price}</p>
                 <a href="#cart" class="cart_item_removeBtn">Remove</a>
             </div>
           
            <div class="cartquantity cart_item_quantity">
                <input min="1" type="number" value="${productsInCart[i].quantity}"   name="quantity" class="quantity">
           </div>
         </div>`
    }


}


function cartProductsCount(productsInCart) {
    let count = 0;

    if (localStorage.getItem("cartItems") !== null) {
        for (let i = 0; i < productsInCart.length; i++) {
            count += productsInCart[i].quantity;
        }
    }


    return count;
}


function subtotal(productsInCart, cartItemPrice) {

    let count = 0;
    let price = undefined;
    for (let i = 0; i < productsInCart.length; i++) {
        price = Number(cartItemPrice[i].innerText.replace(/[^0-9\.]+/g, ''));
        count += (price * productsInCart[i].quantity)
    }

    return count.toFixed(2);
}


function removeFromCart(removeBtn) {
    console.log(removeBtn);
    removeBtn.forEach(function(value, index, removeBtn) {
        removeBtn[index].addEventListener("click", a = function(e) {
            productsInCart.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(productsInCart));
            productsInCart = JSON.parse(localStorage.cartItems);


            if (productsInCart.length !== 0) {
                cartContentArea.innerHTML = "";

                for (let i = 0; i < productsInCart.length; i++) {
                    cartContentArea.innerHTML += `
                <div class="cart_item">
                <div class="cart_item_img_area">
                     <img class="cart_item_img" src="${productsInCart[i].image}" alt="">
                 </div>
                 <div class="cart_item_text">
                     <p class="cart_item_name">${productsInCart[i].name}</p>
                     <p class="cart_item_price">${productsInCart[i].price}</p>
                     <a href="#cart" class="cart_item_removeBtn">Remove</a>
                 </div>
               
                <div class="cartquantity cart_item_quantity">
                    <input min="1" type="number" value="${productsInCart[i].quantity}"   name="quantity" class="quantity">
               </div>
             </div>`;
                }

                cartCount.innerText = cartProductsCount(productsInCart);

                const cartItemPrice = document.querySelectorAll(".cart_item_price");
                totalPrice.innerText = `$ ${subtotal(productsInCart,cartItemPrice)} USD`;


                cart_btn.click();

            } else {
                cartContentArea.innerHTML = "";
                cartCount.innerText = cartProductsCount(productsInCart);
                localStorage.removeItem("cartItems");
                defaulCartStyleChange(0)
            }
        });
    });
}


function cartInputChange(cartItemPrice) {
    const input = document.querySelectorAll(".quantity");

    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("change", () => {
            productsInCart[i].quantity = input[i].value;
            localStorage.setItem("cartItems", JSON.stringify(productsInCart));
            productsInCart = JSON.parse(localStorage.cartItems);
            productsInCart[i].quantity = Number(productsInCart[i].quantity);
            console.log(productsInCart);
            totalPrice.innerText = `$ ${subtotal(productsInCart,cartItemPrice)} USD`;
            cartCount.innerText = cartProductsCount(productsInCart);;
        });
    }
}



const filterBtn = document.querySelectorAll(".filter_btn");

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", () => {
        for (let j = 0; j < filterBtn.length; j++) {
            filterBtn[j].classList.remove("active");
        }

        filterBtn[i].classList.add("active");
    });
}