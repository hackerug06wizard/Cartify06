const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 700,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    id: 2,
    name: "Headphones",
    price: 120,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9"
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 30,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 4,
    name: "Sofa",
    price: 500,
    category: "home",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c"
  }
];

const productsContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      <p>$${product.price}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Added to cart!");
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
