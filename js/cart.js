let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function formatUGX(amount) {
  return "UGX " + amount.toLocaleString();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.style.marginBottom = "15px";
    div.style.padding = "10px";
    div.style.background = "white";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: ${formatUGX(item.price)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: ${formatUGX(item.price * item.quantity)}</p>
      <button onclick="removeItem(${index})"
        style="background:red;color:white;border:none;padding:5px;border-radius:5px;">
        Remove
      </button>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotal.innerText = "Grand Total: " + formatUGX(total);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Checkout coming soon 🚀");
});

renderCart();
