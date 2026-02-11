let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-container");
const totalDisplay = document.getElementById("cart-total");

function renderCart() {
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.image}" class="cart-img">
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>UGX ${item.price.toLocaleString()}</p>

                <div class="quantity-controls">
                    <button onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    });

    totalDisplay.textContent = total.toLocaleString();
}

function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
