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
