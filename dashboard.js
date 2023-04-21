// import { user } from "./script.js";
let dashboardWelcome = document.getElementById("welcome");
// dashboardWelcome.innerHTML = `<h1 class="dashboard-welcome"> Welcome, ${user.username}! <h1>`;


// Get the welcome div and the logout button
let welcomeDiv = document.getElementById("welcome");
let logoutBtn = document.getElementById("logout-btn");

// Get the current user information from localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If there is no current user, redirect to the login page
if (!currentUser) {
  window.location.href = "index.html";
}

// Display the welcome message with the current user's name
dashboardWelcome.innerHTML = `<h2>Welcome to your dashboard , ${currentUser.username}!</h2>`;

// Handle the logout process
logoutBtn.addEventListener("click", () => {
  // Remove the current user from localStorage and redirect to the login page
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

let blogTitle = document.getElementById('blogTitle');
let blogContent = document.getElementById('blogContent');
let postwrapper = document.getElementById('postwrapper')
let viewwrapper = document.getElementById('posted')
let Liked = document.getElementsByClassName('Liked')
let date = new Date
// let gotten = JSON.parse(localStorage.getItem("allPosts"))
viewwrapper.style.display = 'none'
let postArr = JSON.parse(localStorage.getItem("saved")) || [];
console.log(postArr);
showPost()

function post() {

  let postObj = {
    id: postArr.length + 1,
    blogTitle: blogTitle.value,
    blogContent: blogContent.value,
    time: date,
    isLiked: false
  };
  console.log(postObj);
  if (postArr == null) {
    postArr = [];
    postArr.push(postObj);
    localStorage.setItem("saved", JSON.stringify(postArr));
    showPost()
  } else {
    postArr.push(postObj);
    localStorage.setItem("saved", JSON.stringify(postArr));
    showPost()
  }

  postwrapper.style.display = 'none'
  viewwrapper.style.display = 'block'
}

function showPost() {
  if (postArr == null) {
    return;
  } else {
    viewwrapper.innerHTML = ""
    postArr.forEach((element, index) => {
      viewwrapper.innerHTML += `
          <div class="post">
              <h1>${element.blogTitle}</h1>
              <p>${element.blogContent}</p>
              <small>${date}</small>
          </div>
      `
      if (element.isLiked == true) {
        viewwrapper.innerHTML += `
          <button class="post" style="background-color: blue;" onclick="likePost(${element.id})">
              unlike
          </button>
          `
      } else {
        viewwrapper.innerHTML += `
          <button class="post" onclick="likePost(${element.id})">
              Like
          </button>
          `
      }

    });
  }
}
showPost()
function likePost(id) {
  let found = postArr.find(el => el.id == id);
  if (found.isLiked == false) {
    found.isLiked = true;
    localStorage.setItem("saved", JSON.stringify(postArr))
    showPost()
  } else {
    found.isLiked = false;
    localStorage.setItem("saved", JSON.stringify(postArr))
    showPost()
  }
  console.log(found);
}

function postBlog() {
  postwrapper.style.display = 'block'
  viewwrapper.style.display = 'none'

}


function viewPost() {
  viewwrapper.style.display = 'block'
  postwrapper.style.display = 'none'
}
function viewLiked() {
  if (Liked.innerHTML == "") {
    Liked.innerHTML = 'There are no liked posts'
    d
  }
}
