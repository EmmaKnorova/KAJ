console.log("year.js is loaded");

const year = new Date().getFullYear();
document.querySelector("footer").textContent = year;