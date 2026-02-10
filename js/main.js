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
// ===== CART =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCounter();

// ===== CART FUNCTIONS =====
function updateCartCounter() {
  const cartCounter = document.getElementById('cart-count');
  cartCounter.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(product, qty = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
  alert(`${product.name} added to cart!`);
}

// ===== PRODUCT MODAL =====
const modal = document.createElement('div');
modal.id = "product-modal";
modal.style.cssText = `
  display:none; position:fixed; top:0; left:0; width:100%; height:100%;
  background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:10000;
`;
modal.innerHTML = `
  <div id="modal-content" style="background:#fff;padding:20px;border-radius:10px;max-width:400px;width:90%;position:relative;">
    <span id="modal-close" style="position:absolute;top:10px;right:15px;cursor:pointer;font-size:20px;">&times;</span>
    <img id="modal-img" src="" style="width:100%;border-radius:10px;">
    <h3 id="modal-name"></h3>
    <p id="modal-price" style="color:#007bff;font-weight:bold;"></p>
    <p id="modal-desc">This is a placeholder description for the product.</p>
    <input type="number" id="modal-qty" min="1" value="1" style="width:60px;padding:5px;">
    <button id="modal-add-to-cart" style="margin-top:10px;padding:10px 20px;background:#007bff;color:#fff;border:none;border-radius:5px;cursor:pointer;">Add to Cart</button>
  </div>
`;
document.body.appendChild(modal);

document.getElementById('modal-close').addEventListener('click', () => {
  modal.style.display = 'none';
});

// ===== RENDER PRODUCTS WITH MODAL =====
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

    // Open modal when product clicked
    card.querySelector('img').addEventListener('click', () => {
      document.getElementById('modal-img').src = p.image;
      document.getElementById('modal-name').innerText = p.name;
      document.getElementById('modal-price').innerText = `$${p.price}`;
      document.getElementById('modal-qty').value = 1;
      modal.style.display = 'flex';

      document.getElementById('modal-add-to-cart').onclick = () => {
        const qty = parseInt(document.getElementById('modal-qty').value);
        addToCart(p, qty);
        modal.style.display = 'none';
      };
    });

    // Add to cart button on card
    card.querySelector('.add-to-cart').addEventListener('click', () => {
      addToCart(p, 1);
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
