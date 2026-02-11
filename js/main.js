const products = [
  { id: 1, name: "Smartphone", price: 2500000, category: "electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { id: 2, name: "Headphones", price: 350000, category: "electronics", image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9" },
  { id: 3, name: "T-Shirt", price: 45000, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 4, name: "Sofa", price: 1200000, category: "home", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsContainer = document.getElementById("products");

function formatUGX(amount) {
  return "UGX " + amount.toLocaleString();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText =
    cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderProducts(filteredProducts) {
  productsContainer.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${formatUGX(product.price)}</p>
      <button>Add to Cart</button>
    `;

    const button = card.querySelector("button");

    button.addEventListener("click", () => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) existing.quantity++;
      else cart.push({ ...product, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

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

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});

/* PRICE FILTER */
document.getElementById("filterBtn").addEventListener("click", () => {
  const min = parseInt(document.getElementById("minPrice").value) || 0;
  const max = parseInt(document.getElementById("maxPrice").value) || Infinity;

  const filtered = products.filter(p =>
    p.price >= min && p.price <= max
  );

  renderProducts(filtered);
});

/* CATEGORY */
document.querySelectorAll(".categories button").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const filtered = category === "all"
      ? products
      : products.filter(p => p.category === category);

    renderProducts(filtered);
  });
});

renderProducts(products);
updateCartCount();
