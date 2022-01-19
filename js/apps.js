// MOBILE HAMBUGER
const hamburger = document.querySelector(".hamburger");
const mobile = document.querySelector(".mobile");
const close = document.querySelector(".close");
const mobileBackdrop = document.querySelector(".mobile-backdrop");

hamburger.addEventListener("click", () => {
  mobile.classList.remove("displayNone");
});

close.addEventListener("click", () => {
  mobile.classList.add("displayNone");
});

mobileBackdrop.addEventListener("click", () => {
  mobile.classList.add("displayNone");
});

// TAB CONTENT
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    target.classList.add("active");
  });
});

// display images
const productEl = document.querySelector(".products");

function displayGoods() {
  products.forEach((product, idx) => {
    productEl.innerHTML += `
        <div class="items" onclick="storeSelectedProduct(${idx})">
            <div class="displayImg">
                <img src="${product.imgSrc}" alt="#" class="displayImg">
            </div>
            <div class="displayText">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <h4>$${product.price}</h4>
            </div>
        </div>
        `;
  });
}
displayGoods();

// DISPLAY SELECTED ITEMS
let data = JSON.parse(localStorage.getItem("CART")) || [];

let cartItems = {};

let number_of_items_in_cart = document.querySelector(
  ".number_of_items_in_cart"
);

let cartItem = document.querySelector(".cart_item").children[1].children[1];

let i = 0;

const linkSneaker = document.getElementById("linkSneaker")

const storeSelectedProduct = (productIndex) => {
  cartItems = products[productIndex];

  linkSneaker.scrollIntoView({behavior: "smooth"})

  // RENDER SELECTED ITEMS
  let sneaker = document.querySelector(".sneakers");

  sneaker.innerHTML = `
  <div class="thumbnails">
      <div class="main_image">
          <img id="displayImg" src="${cartItems.imgSrc}" alt="#" class="main_img">
      </div>
      <div class="thumbs">
          <li onclick="thumbChange(1)"><img src="/images/image-product-1-thumbnail.jpg" alt="#"></li>
          <li onclick="thumbChange(2)"><img src="/images/image-product-2-thumbnail.jpg" alt="#"></li>
          <li onclick="thumbChange(3)"><img src="/images/image-product-3-thumbnail.jpg" alt="#"></li>
          <li onclick="thumbChange(4)"><img src="/images/image-product-4-thumbnail.jpg" alt="#"></li>
      </div>
  </div>
  <div class="sneaker_text">
      <h5>SNEAKER COMPANY</h5>
      <h1>${cartItems.name}</h1>
      <p>These low-profile sneakers are your perfect casual wear companion. Featuring a
          durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
      <div class="amount">
          <div>
              <h2>$${cartItems.price}.00</h2>
          </div>
          <div>
              <h4>50%</h4>
          </div>
      </div>
      <p class="strike">$250.00</p>
      <div class="addToCart">
          <div class="increase">
              <img src="/images/icon-minus.svg" alt="#" class="minus">
              <p class="num">${cartItems.count}</p>
              <img src="/images/icon-plus.svg" alt="#" id="plus">
          </div>
          <button class="addToCartBtn"><img src="/images/icon-cart.svg" alt="#"> Add to
              cart</button>
      </div>
  </div>
  `;

  // increamenting value
  const plus = document.querySelector("#plus");
  const minus = document.querySelector(".minus");
  let num = document.querySelector(".num");


  plus.addEventListener("click", (e) => {
    cartItems.count++;
    num.textContent = cartItems.count;
  });
  minus.addEventListener("click", () => {
    if (cartItems.count === 1) {
      alert("Item must be 1 or greater");
    } else {
      cartItems.count--;
      num.textContent = cartItems.count;
    }
  });

  // CAROUSEL
  const mainImg = document.querySelector(".main_image");

  const slides = document.getElementsByClassName("carousel_item");
  let slidePosition = 0;

  const totalSlides = slides.length;

  mainImg.addEventListener("click", () => {
    let modal = document.querySelector(".modal");
    let modalBackdrop = document.querySelector(".modal-backdrop");
    modal.classList.remove("displayNone");

    modalBackdrop.addEventListener("click", () => {
      modal.classList.add("displayNone");
    });

    let previous = document.getElementById("carousel_button_prev");

    previous.addEventListener("click", () => {
      moveToPrevSlide();
    });

    let next = document.getElementById("carousel_button_next");
    next.addEventListener("click", () => {
      moveToNextSlide();
    });

    function moveToPrevSlide() {
      if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
      } else {
        slidePosition--;
      }
      updateSlides();
    }

    function moveToNextSlide() {
      if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
      } else {
        slidePosition++;
      }
      updateSlides();
    }
  });

  function updateSlides() {
    for (let slide of slides) {
      slide.classList.remove("carousel_item_visible");
      slide.classList.add("carousel_item_hidden");
    }

    slides[slidePosition].classList.add("carousel_item_visible");
  }

  updateSlides();
  let thumbChanges = document.querySelectorAll(".thumbChange");
  thumbChanges.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => {
      slidePosition = idx;
      updateSlides();
    });
  });

  // addToCart
  let addToCartBtn = document.querySelector(".addToCartBtn");


  addToCartBtn.addEventListener("click", () => {
    cartItems.total = cartItems.price * cartItems.count;
    cartItem.innerHTML += `
    <div class="cartItemSub">
        <div class="cartItemImage">
            <img src="${cartItems.imgSrc}" alt="#" class="cartItemImage">
        </div>
        <div class="cartItemText">
            <p>${cartItems.name}</p>
            <p>$${cartItems.price} X ${cartItems.count} <span class="total">$${cartItems.total}</span></p>
        </div>
    </div>
    `;
    number_of_items_in_cart.value++;

    data.push(cartItems);
    localStorage.setItem("CART", JSON.stringify(data));

    let clear = document.querySelector('.clear')

    if (localStorage.getItem("CART")!== null) {
      clear.classList.remove("displaydisabled")
    }else{
      clear.classList.add("displaydisabled")
    }
  });
};

const clearItem = () =>{
  if (localStorage.getItem("CART")== null) {
    return;
  }else{
    localStorage.clear("CART");
    window.location.reload()
  }
}

let clear = document.querySelector('.clear')

if (localStorage.getItem("CART")!== null) {
  clear.classList.remove("displaydisabled")
}else{
  clear.classList.add("displaydisabled")
}

const updateCart = () =>{
  const i = JSON.parse(localStorage.getItem("CART"));
  number_of_items_in_cart.value = i.length;
  i.map((item, idx) => {
    let total = 0;   
    return (cartItem.innerHTML += `
    <div class="cartItemSub">
        <div class="cartItemImage">
            <img src="${item.imgSrc}" alt="#" class="cartItemImage">
        </div>
        <div class="cartItemText">
            <p>${item.name}</p>
            <p>$${item.price} X ${item.count} <span class="total">$${item.total}</span></p>
        </div>
    </div>
    `);
    
  });
}
window.addEventListener("load", () => {
  updateCart()
});

// THUMBNAILS
function thumbChange(num) {
  const thumb = "/images/image-product-" + num + ".jpg";
  document.getElementById("displayImg").src = thumb;
}

let basket = document.querySelector(".basket");
basket.addEventListener("click", () => {
  let addedCartItem = document.querySelector(".addedCartItem");
  if (addedCartItem.classList.contains("displayNone")) {
    addedCartItem.classList.remove("displayNone");
  } else {
    addedCartItem.classList.add("displayNone");
  }
});