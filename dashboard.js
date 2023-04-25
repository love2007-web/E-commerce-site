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
            <small>${title}</small>
            <h3>$${price}</h3>
            <p>Items remaining: ${noOfItems}</p>
        </div>
        </button>
        
        `
    });
    // console.log(empArr);
})