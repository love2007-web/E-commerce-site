// Get the welcome div and the logout button
let welcomeDiv = document.getElementById("welcome");
let logoutBtn = document.getElementById("logout-btn");

// Get the current user information from localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If there is no current user, redirect to the login page
if (!currentUser) {
    window.location.href = "index.html";
  }

// Handle the logout process
logoutBtn.addEventListener("click", () => {
  // Remove the current user from localStorage and redirect to the login page
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});



let myGoods;
    let url = "https://fakestoreapi.com/products";
    let dispGoods = document.getElementById("items")
    async function fetchGoods(){
        let goods = await fetch(url);
        let res = await goods.json();
        localStorage.setItem("goods", JSON.stringify(res))
    }
    fetchGoods();

    myGoods = JSON.parse(localStorage.getItem("goods"));
    let myCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(myCart);

    async function displayGoods(){
        let resp = await myGoods.forEach((el, index)=>{
        let errmm = myCart.some(ssmm => ssmm.id == el.id);
        dispGoods.innerHTML += `
                <div onclick="showOne(${el.id})" class='btn col-md-3 m-1 card shadow w-25'>
                    <img src=${el.image} w-75 />
                    <p>${el.title}</p>
                    <h3>$${el.price}</h3>
                    
                </div>
            `
        })
    }
    displayGoods();
    

    function addToCart(ev, id){
        let found = myGoods.find(el=> el.id == id)
        console.log(found);
        console.log(myCart);
        let errmm = myCart.some(ssmm => ssmm.id == found.id);
        console.log(errmm);
        if(errmm){
            ev.target.innerHTML = "Not there... Add";
            let myIndex = myCart.indexOf(found)
            console.log(myIndex);
            myCart.splice(myIndex,1)
            localStorage.setItem("cart", JSON.stringify(myCart));
            cartCount();
            return;
        }else{
            ev.target.innerHTML = "Already there... Remove"
            myCart.push(found);
            localStorage.setItem("cart", JSON.stringify(myCart));
            cartCount();
        }
        console.log(myCart);
        displayGoods();
    }

    function cartCount(){
        document.getElementById("cart-count").innerHTML = myCart.length;
    }
    cartCount();
    
    function showOne(id){
        localStorage.setItem("oneItem", id);
        window.location.href = "oneProd.html"
    }
    myCart.forEach((element, index) => {
        let itemId = `item-${index}`; // generate unique id for each item
        console.log(index);
        document.getElementById('modal-body').innerHTML += `
            <div class="d-flex">
                <div class="cart-img">
                    <img src="${element.image}"/>
                </div>
                <div>
                    <h6>${element.title}</h6>
                    <h5>$${element.price}</h5>
                </div>
                <div>
                    <button onclick="minusProd(${index}, ${element.price})">&minus;</button>
                    <span id="dispQTY-${itemId}">${element.quantity}</span>
                    <button onclick="addProd(${index}, ${element.price})">&plus;</button><br>
                    <span id="showPrice-${itemId}">$${element.totPrice}</span>
                </div>
            </div>
        `;
    });
    
    function addProd(index, price) {
        myCart[index].quantity++;
        myCart[index].totPrice = myCart[index].quantity * price;
    
        let itemId = `item-${index}`;
        document.getElementById(`showPrice-${itemId}`).innerHTML = `$${myCart[index].totPrice}`;
        document.getElementById(`dispQTY-${itemId}`).innerHTML = myCart[index].quantity;
    
        localStorage.setItem("cart", JSON.stringify(myCart));
        updateTotalPrice()
    }
    
    function minusProd(index, price) {
        if (myCart[index].quantity > 1) {
            myCart[index].quantity--;
            myCart[index].totPrice = myCart[index].quantity * price;
    
            let itemId = `item-${index}`;
            document.getElementById(`showPrice-${itemId}`).innerHTML = `$${myCart[index].totPrice}`;
            document.getElementById(`dispQTY-${itemId}`).innerHTML = myCart[index].quantity;
    
            localStorage.setItem("cart", JSON.stringify(myCart));
        }
        updateTotalPrice()
    }
    function updateTotalPrice() {
        let totalPrice = 0;
        myCart.forEach(item => {
        totalPrice += item.totPrice;
        });

        document.getElementById("cart-total").innerHTML = "Total: $" + totalPrice;

    }
    updateTotalPrice()

    // flutter wave payment
    function makePayment() {
        FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
          tx_ref: "titanic-48981487343MDI0NzMx",
          amount: 54600,
          currency: "NGN",
          payment_options: "card, banktransfer, ussd",
          redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: "rose@unsinkableship.com",
            phone_number: "08102909304",
            name: "Rose DeWitt Bukater",
          },
          customizations: {
            title: "The Titanic Store",
            description: "Payment for an awesome cruise",
            logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
          },
        });
      }