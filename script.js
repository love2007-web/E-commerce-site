let empArr = []
let items = document.getElementById("items")
fetch("https://fakestoreapi.com/products").then((dan) => dan.json()).then((res) => {
    console.log(res);
    res.forEach((element, index) => {
        empArr.push(element.image);
        let img = element.image
        let price = element.price
        let title = element.title
        let noOfItems = element.rating.count
        items.innerHTML += `
        <button id="items" class="btn g-col-6 g-col-md-4 text-dark">
        <img src="${img}">
        <div>
            <p>$${price}</p>
        </div>
        </button>
        `
    });
    // console.log(empArr);
})