const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 2500000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    id: 2,
    name: "Headphones",
    price: 350000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9"
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 45000,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 4,
    name: "Sofa",
    price: 1200000,
    category: "home",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c"
  }
];

const productsContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Format UGX */
function formatUGX(amount) {
  return "UGX " + amount.toLocaleString();
}

/* Update Cart Counter */
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = total;
}

/* Render Products */
function renderProducts(filter = "all") {
  productsContainer.innerHTML = "";

  const filtered =
    filter === "all"
      ? products
      : products.filter(product => product.category === filter);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatUGX(product.price)}</p>
      <button>Add to Cart</button>
    `;

    const button = card.querySelector("button");

    button.addEventListener("click", () => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Change button text instead of alert
      button.innerText = "Added ✓";
      button.classList.add("added");

      setTimeout(() => {
        button.innerText = "Add to Cart";
        button.classList.remove("added");
      }, 1500);
    });

    productsContainer.appendChild(card);
  });
}

/* Category Buttons */
document.querySelectorAll(".categories button").forEach(button => {
  button.addEventListener("click", () => {
    renderProducts(button.dataset.category);
  });
});

renderProducts();
updateCartCount();
