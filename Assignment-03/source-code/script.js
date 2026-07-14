let cart = [];
let total = 0;

// Show home page on load
showSection("home");

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if (user === "admin" && pass === "1234") {
    showSection("home");
  } else {
    document.getElementById("loginMsg").innerText = "Invalid credentials";
  }
}

// ADD TO CART
function addToCart(item, price) {
  cart.push({ item, price });
  alert(item + " added to cart");
}

// SHOW CART
function showCart() {
  showSection("cart");
  let list = document.getElementById("cartItems");
  list.innerHTML = "";
  total = 0;
  cart.forEach(p => {
    let li = document.createElement("li");
    li.innerText = `${p.item} - ₹${p.price}`;
    list.appendChild(li);
    total += p.price;
  });
  document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}

// CHECKOUT
function checkout() {
  showSection("checkout");
}

// FINAL BILL
function placeOrder() {
  showSection("bill");
  document.getElementById("billAmount").innerText = "Total Amount: ₹" + total;
}
