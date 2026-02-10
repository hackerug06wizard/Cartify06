// MAIN JS FILE
console.log("Cartify loaded!");

// Search functionality placeholder
const searchInput = document.getElementById('search');
searchInput?.addEventListener('input', (e) => {
  console.log('Search query:', e.target.value);
});

// Cart count placeholder
let cartCount = 0;
const cartCounter = document.getElementById('cart-count');
function addToCart() {
  cartCount++;
  cartCounter.innerText = cartCount;
}
// ===== STATIC PRODUCTS =====
const products = [
  { id: 1, name: "Smartphone", price: 699, category: "electronics", image: "img/products/smartphone.jpg" },
  { id: 2, name: "Headphones", price: 99, category: "electronics", image: "img/products/headphones.jpg" },
  { id: 3, name: "T-Shirt", price: 25, category: "fashion", image: "img/products/tshirt.jpg" },
  { id: 4, name: "Jeans", price: 50, category: "fashion", image: "img/products/jeans.jpg" },
  { id: 5, name: "Organic Apples", price: 10, category: "groceries", image: "img/products/apples.jpg" },
  { id: 6, name: "Coffee Maker", price: 120, category: "home", image: "img/products/coffeemaker.jpg" },
  { id: 7, name: "Lipstick", price: 20, category: "beauty", image: "img/products/lipstick.jpg" }
];

// ===== RENDER PRODUCTS =====
const productsContainer = document.getElementById('products-container');

function renderProducts(filter = "all") {
  productsContainer.innerHTML = "";
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">$${p.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    productsContainer.appendChild(card);

    // Add to cart button
    card.querySelector('.add-to-cart').addEventListener('click', () => {
      cartCount++;
      cartCounter.innerText = cartCount;
    });
  });
}

// Initial render
renderProducts();

// ===== CATEGORY FILTER =====
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    renderProducts(btn.dataset.category);
  });
});
