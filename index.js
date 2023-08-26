const signInBtnNav = document.getElementById("nav-sign-in-btn");
const dashboardBtnNav = document.getElementById("nav-dashboard-btn");
let dashbutton = document.getElementById("dashbutton");



const token = localStorage.getItem("token");
if (token) {
  signInBtnNav.style.display = "none";
  dashboardBtnNav.style.display = "block";
  dashbutton.href=(dashbutton.href.substring(0, 22)+"./dashboard/index.html");
} else {
  signInBtnNav.style.display = "block";
  dashboardBtnNav.style.display = "none";
}



