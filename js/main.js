// =============================
// CARTIFY MAIN.JS
// =============================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sample products (You can replace with your own)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 120000,
        image: "images/headphones.jpg",
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 95000,
        image: "images/watch.jpg",
        category: "electronics"
    },
    {
        id: 3,
        name: "Sneakers",
        price: 85000,
        image: "images/shoes.jpg",
        category: "fashion"
    },
    {
        id: 4,
        name: "Backpack",
        price: 60000,
        image: "images/bag.jpg",
        category: "fashion"
    }
];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const priceFilter = document.getElementById("price-filter");


// =============================
// DISPLAY PRODUCTS
// =============================
function displayProducts(filteredProducts) {
    productContainer.innerHTML = "";

    filteredProducts.forEach(product => {

        const productDiv = document.createElement("div");
        productDiv.classList.add("product-card");

        productDiv.innerHTML = `
            <img src="${product.image}" class="product-img">
            <h3>${product.name}</h3>
            <p>UGX ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})" id="btn-${product.id}">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(productDiv);
    });
}


// =============================
// ADD TO CART
// =============================
function addToCart(id) {

    const product = products.find(p => p.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Change button text instead of alert
    const button = document.getElementById(`btn-${id}`);
    button.textContent = "Added ✓";
    button.disabled = true;

    setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false;
    }, 1500);
}


// =============================
// UPDATE CART COUNT
// =============================
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
}


// =============================
// SEARCH FUNCTION
// =============================
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );

        displayProducts(filtered);
    });
}


// =============================
// PRICE FILTER
// =============================
if (priceFilter) {
    priceFilter.addEventListener("change", function () {
        const maxPrice = parseInt(this.value);

        if (maxPrice === 0) {
            displayProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.price <= maxPrice
            );
            displayProducts(filtered);
        }
    });
}


// =============================
// INITIAL LOAD
// =============================
displayProducts(products);
updateCartCount();
