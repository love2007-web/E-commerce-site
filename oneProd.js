let myGoods = JSON.parse(localStorage.getItem("goods"));
    let the_id  = localStorage.getItem("oneItem")
    console.log(the_id);
    console.log(myGoods);
    let myCart = JSON.parse(localStorage.getItem("cart")) || [];
    let theItem = myGoods.find(el=> el.id == the_id)
    let errmm = myCart.some(ssmm => ssmm.id == theItem.id);
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