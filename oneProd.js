let itmQty = 1;
let tPrice;
let myGoods = JSON.parse(localStorage.getItem("goods"));
    let the_id  = localStorage.getItem("oneItem")
    console.log(the_id);
    console.log(myGoods);
    let myCart = JSON.parse(localStorage.getItem("cart")) || [];
    let theItem = myGoods.find(el=> el.id == the_id);
    console.log(theItem);
    let errmm = myCart.some(ssmm => ssmm.id == theItem.id);
    dispCart()
    document.getElementById("prod").innerHTML = `
        <div>
            <img src=${theItem.image} />
        </div>
        <div>
            <h3>${theItem.title}</h3>
            <p>Category: ${theItem.category}</p>
            <p>${theItem.description}</p>
            <p>Ratings: ${theItem.rating.rate}</p>
            <h1>$${theItem.price}</h1>
            <button onclick="addToCart(event,${theItem.id})" class='btn btn-warning'>${errmm? "Remove from Cart": "Add to Cart"}</button>
        </div>
    `
    document.getElementById("title").innerHTML = `
    ${theItem.title}
    `
    console.log(theItem);
    function addToCart(ev, id){
        let found = myGoods.find(el=> el.id == id)
        found.quantity = 1; // Set default quantity to 1
        console.log(found);
        console.log(myCart);
        let errmm = myCart.some(ssmm => ssmm.id == found.id);
        console.log(errmm);
        if(errmm){
            ev.target.innerHTML = "Add to cart";
            let myIndex = myCart.indexOf(found)
            console.log(myIndex);
            myCart.splice(myIndex,1)
            localStorage.setItem("cart", JSON.stringify(myCart));
            cartCount();
            return;
        }else{
            ev.target.innerHTML = "Remove from cart"
            found.quantity = 1; // set the default quantity to 1
            found.totPrice = found.price; // set the total price to the price of the item
            myCart.push(found);
            localStorage.setItem("cart", JSON.stringify(myCart));
            cartCount();
        }
        console.log(myCart);
        // displayGoods();
    }
    
    function cartCount(){
        document.getElementById("cart-count").innerHTML = myCart.length;
    }
    cartCount();

    console.log(myCart);

    
    function dispCart() {
        myCart.forEach((element, index) => {
            let itemId = `item-${index}`; // generate unique id for each item
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
    }
    
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
            updateTotalPrice()
        }
    }
    function updateTotalPrice() {
        let totalPrice = 0;
        myCart.forEach(item => {
        totalPrice += item.totPrice;
        });

        document.getElementById("cart-total").innerHTML = "Total: $" + totalPrice;
        
    }
    updateTotalPrice()
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    // flutter wave payment
    function makePayment() {
        FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-f3c675852064643d0c7beea69f1cc965-X",
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
            email: currentUser.email,
            phone_number: "08102909304",
            name: currentUser.username
          },
          customizations: {
            title: "The Titanic Store",
            description: "Payment for an awesome cruise",
            logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
          },
        });
      }