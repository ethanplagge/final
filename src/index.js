var cartCount = 0;
let productInfo = [];

//FIREBASE AUTHENTICATION
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBS3gnu5eZHlmknf6DyTl7xs7x97pXBxv8",
  authDomain: "n315-eplagge.firebaseapp.com",
  projectId: "n315-eplagge",
  storageBucket: "n315-eplagge.appspot.com",
  messagingSenderId: "1093403993027",
  appId: "1:1093403993027:web:29a5cbcb129036a09f9376",
  measurementId: "G-760S8FW5QJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//ROUTING JS
var parentPage = "";

function changePage(pathArray){

  if(pathArray == ""){
    $.get(`pages/home.html`, (data) => {
      $("#app").html(data);
      loadProducts();
    }).fail(() => {
      console.log("failed");
    });
  }else{
    if(pathArray.length == 1){
      $.get(`pages/${pathArray}.html`, (data) => {
        if(data){
          $("#app").html(data);
          addListeners();
          loadCart();
        } else{
          console.log("page not found");
        }
      }).fail(() => {
        console.log("this page doesn't exist");
      });
    } else{
      $("#breadcrumb").html(`> <a href="#${pathArray[0]}">${pathArray[0]}</a>
      / ${pathArray[1]}`);
      $.get(`pages/${pathArray[1]}.html`, (data) => {
        if(data){
          $("#app").html(data);
  
        } else{
          console.log("page not found");
        }
      }).fail(() => {
        console.log("this page doesn't exist");
      });
    }
    
   
  }

}


function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace('#',"");
  let path = pageID.split("/");
  changePage(path);
}

//LOGIN INFO
function addListeners() {
  var createBtn = document.getElementById('createBtn');
  var signInBtn = document.getElementById('signInBtn');
  var signOutBtn = document.getElementById('signOutBtn');
  var loginLink = document.getElementById('login');
  var loginIcon = document.getElementById('loginIcon');
  var deleteBtn = document.getElementById('deleteBtn');
  if (createBtn) {
      createBtn.addEventListener('click', function(e) {
          e.preventDefault();
          let name = $("#Cname").val();
          let email = $("#Cemail").val();
          let password = $("#Cpw").val();
          console.log(name, email, password);
          createUserWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
              });
      });
  }
  if (signInBtn) {
    signInBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let email = $("#Semail").val();
      let password = $("#Spw").val();
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed up 
         const user = userCredential.user;
         console.log(user);
         loginLink.textContent = "Log Out";
         loginIcon.className = 'fa-solid fa-user';
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         alert(errorMessage);
       });
    });
  }
  if (signOutBtn){
    signOutBtn.addEventListener('click', function(e) {
      signOut(auth).then(() => {
        console.log("logged out");
        loginLink.textContent = "Login"
        loginIcon.className = 'fa-regular fa-user';
      }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    });
  }
  if(deleteBtn){
    deleteBtn.addEventListener('click', function(e) {
      productInfo.Cart = [];
      
      cartCount = 0;
      updateCartCount();
      loadCart();
    })
  }
}


//CART INFO

function loadCart(){
  $(".cart-content").html("");
  $.each(productInfo.Cart, (idx, cartItem) => {
    let product = productInfo.Products[cartItem.itemIdx];
    let productText = `<div class="product">
    <div class="productImage">
      <img src="images/${product.productImage}" alt="">
    </div>
    <div class="productDetails">
          <h3>${product.productName}</h3>
          <div class="price-holder">
            <h2><span>$</span>${product.productPrice}</h2>
            <p>${product.dealPrice}</p>`
            if(product.sitePrice){
              productText += `<div class="price-holder">
                <h2><span>$</span>${product.sitePrice}</h2>
                <p>${product.sitePriceDetail}</p>
                </div>`
            }
            if(product.coupon){
              productText += `<div class="coupon-holder">
                <div class="couponTitle">Coupon</div>
                <div class="couponDesc">
                  <p>20% OFF – MERRYSAVINGS</p>
                  <p>Excludes Keurig Starter Kit</p>
                </div>
              </div>`
            }
            productText += ` </div>
            <div class="review-holder">
            <img src="images/${product.reviewImage}" alt="">
            </div>
            <div class="shipping-holder">
            <h3>Free shipping</h3>
            </div>
        </div>
        <div class="bannerText">${product.bannerText}</div>
        </div>` 
    $(".cart-content").append(productText);
  })
}

function loadProducts(){
  
  $.each(productInfo.Products, (idx, product) => { 
    let productText = `<div class="product">
    <div class="productImage">
      <img src="images/${product.productImage}" alt="">
    </div>
    <div class="productDetails">
          <h3>${product.productName}</h3>
          <div class="price-holder">
            <h2><span>$</span>${product.productPrice}</h2>
            <p>${product.dealPrice}</p>`
    if(product.sitePrice){
      productText += `<div class="price-holder">
        <h2><span>$</span>${product.sitePrice}</h2>
        <p>${product.sitePriceDetail}</p>
        </div>`
    }
    if(product.coupon){
      productText += `<div class="coupon-holder">
        <div class="couponTitle">Coupon</div>
        <div class="couponDesc">
          <p>20% OFF – MERRYSAVINGS</p>
          <p>Excludes Keurig Starter Kit</p>
        </div>
      </div>`
    }        
    productText += ` </div>
    <div class="review-holder">
    <img src="images/${product.reviewImage}" alt="">
    </div>
    <div class="shipping-holder">
    <h3>Free shipping</h3>
    </div>
    <div id="${idx}" class="buyNow">BUY NOW</div>
</div>
<div class="bannerText">${product.bannerText}</div>
</div>`
    $(".product-wrapper").append(productText);
});
  
  $(".buyNow").on("click", (e) => {
    let productIdx = e.currentTarget.id;
    let obj = {
      itemIdx: productIdx
    }
    productInfo.Cart.push(obj);
    cartCount = productInfo.Cart.length;
    updateCartCount();
    })
}

function updateCartCount(){
  if(cartCount == 0){
    $('.cartCounter').css("display", "none");
  }else if(cartCount >= 1){
    $('.cartCounter').css("display", "block");
    $('.cartCounter').html(cartCount);
  } 
}

function getData(callback){
  $.get(`data/data.json`, (data) => {
    productInfo = data;
    if (callback) {
      //updates the array after the data is fetched
      callback(); 
    }
  }).fail(function (error) {
    alert("error: ", error);
  });
}


function initSite(){
  $(window).on('hashchange', route);
  route();
  updateCartCount();
  getData(function(){
    loadProducts();
  });
}

$(document).ready(function (){
  initSite();
})