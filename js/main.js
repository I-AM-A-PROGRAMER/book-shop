// ==========================================
// COMMON SCRIPTS & ROUTER
// js/main.js
// ==========================================

console.log("Welcome to BookHive! 📚");

document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight Active Nav Link
    highlightActiveNav();

    // 2. Setup Page-Specific Logic
    initPage();
});

// Highlight active navbar links
function highlightActiveNav() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
            // Add style inline to be safe or use stylesheet
            link.style.backgroundColor = "var(--accent)";
            link.style.color = "var(--primary)";
            link.style.fontWeight = "bold";
        }
    });
}

// Route page loading
function initPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "index.html") {
        initHomePage();
    } else if (path === "book.html") {
        initDetailPage();
    } else if (path === "contact.html") {
        initContactPage();
    }
}

// Home page logic
function initHomePage() {
    // Personalized Time Greeting
    const greetingElement = document.getElementById("hero-subtitle");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = "Good Evening";
        if (hour < 12) greeting = "Good Morning";
        else if (hour < 17) greeting = "Good Afternoon";
        greetingElement.textContent = `${greeting}! Find your next great read.`;
    }

    // Dynamically render first 4 featured books so they have proper action handlers
    const homeGrid = document.querySelector(".featured .book-grid");
    if (homeGrid && typeof books !== "undefined") {
        // Take first 4 books
        const featuredBooks = books.slice(0, 4);
        homeGrid.innerHTML = featuredBooks.map(book => `
            <article class="book-card" data-id="${book.id}">
                <a href="book.html?id=${book.id}" style="text-decoration: none; color: inherit;">
                    <img src="${book.image}" alt="${book.title}" loading="lazy">
                    <h3>${book.title}</h3>
                </a>
                <p class="author">by ${book.author}</p>
                <p class="rating">⭐ ${book.rating} (${book.reviews} reviews)</p>
                <p class="price">
                    ₹${book.price}
                    <small><s>₹${book.originalPrice}</s></small>
                </p>
                <button class="add-to-cart" data-id="${book.id}" ${!book.inStock ? "disabled" : ""}>
                    ${book.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
            </article>
        `).join("");
    }
}

// Single book detail page logic
function initDetailPage() {
    if (typeof books === "undefined") return;

    // Get book ID from URL query parameters (e.g. book.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get("id")) || 1; // Default to ID 1

    const book = books.find(b => b.id === bookId);
    const mainContainer = document.querySelector("main");

    if (!book && mainContainer) {
        mainContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Book Not Found</h2>
                <p>Sorry, the book you are looking for does not exist.</p>
                <a href="books.html" class="btn-primary" style="display: inline-block; width: auto; margin-top: 20px;">Back to Catalog</a>
            </div>
        `;
        return;
    }

    // Dynamically update breadcrumb
    const breadcrumbOl = document.querySelector(".breadcrumb ol");
    if (breadcrumbOl) {
        breadcrumbOl.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="books.html">Books</a></li>
            <li style="color: var(--text-muted);">${book.title}</li>
        `;
    }

    // Dynamically generate book details HTML
    const detailContainer = document.querySelector(".book-detail");
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title} cover">
            </div>
            <div class="book-info">
                <h2>${book.title}</h2>
                <p class="author">by <strong>${book.author}</strong></p>
                <div class="rating">
                    ⭐⭐⭐⭐⭐ ${book.rating} out of 5 (${book.reviews} reviews)
                </div>
                <p class="price">
                    ₹${book.price} 
                    <small><s>₹${book.originalPrice}</s> (${Math.round((book.originalPrice - book.price) / book.originalPrice * 100)}% off)</small>
                </p>
                <p class="description">${book.description}</p>
                
                <h3>Book Details</h3>
                <dl class="book-details">
                    <dt>Category:</dt>
                    <dd style="text-transform: capitalize;">${book.category}</dd>
                    <dt>Publisher:</dt>
                    <dd>BookHive Publishing</dd>
                    <dt>Language:</dt>
                    <dd>English</dd>
                    <dt>Status:</dt>
                    <dd>${book.inStock ? '<span style="color: var(--success); font-weight: bold;">In Stock</span>' : '<span style="color: var(--error); font-weight: bold;">Out of Stock</span>'}</dd>
                </dl>

                <div class="purchase-actions">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1" max="10" ${!book.inStock ? "disabled" : ""}>
                    <button class="btn-primary add-to-cart-detail" data-id="${book.id}" ${!book.inStock ? "disabled" : ""}>
                        ${book.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button class="btn-secondary buy-now-btn" data-id="${book.id}" ${!book.inStock ? "disabled" : ""}>Buy Now</button>
                </div>
            </div>
        `;

        // Attach listeners for detail page buttons
        const addToCartBtn = document.querySelector(".add-to-cart-detail");
        if (addToCartBtn) {
            addToCartBtn.addEventListener("click", () => {
                const qtyInput = document.getElementById("quantity");
                const qty = parseInt(qtyInput.value) || 1;
                if (typeof addToCart === "function") {
                    for (let i = 0; i < qty; i++) {
                        addToCart(book.id);
                    }
                }
            });
        }

        const buyNowBtn = document.querySelector(".buy-now-btn");
        if (buyNowBtn) {
            buyNowBtn.addEventListener("click", () => {
                const qtyInput = document.getElementById("quantity");
                const qty = parseInt(qtyInput.value) || 1;
                if (typeof addToCart === "function") {
                    for (let i = 0; i < qty; i++) {
                        addToCart(book.id);
                    }
                    window.location.href = "cart.html";
                }
            });
        }
    }
}

// Show standard loader in catalog page
function showLoader() {
    const container = document.getElementById("books-container");
    if (container) {
        container.innerHTML = '<div class="spinner"></div>';
    }
}

// Create HTML structure for a single card in the catalog
function createBookCard(book) {
    return `
        <article class="book-card" data-id="${book.id}">
            <a href="book.html?id=${book.id}" style="text-decoration: none; color: inherit;">
                <img src="${book.image}" alt="${book.title}" loading="lazy">
                <h3>${book.title}</h3>
            </a>
            <p class="author">by ${book.author}</p>
            <p class="rating">⭐ ${book.rating} (${book.reviews} reviews)</p>
            <p class="price">
                ₹${book.price}
                <small><s>₹${book.originalPrice}</s></small>
            </p>
            <button class="add-to-cart" data-id="${book.id}" ${!book.inStock ? "disabled" : ""}>
                ${book.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
        </article>
    `;
}

// Render the book cards list
function renderBooks(bookList) {
    const booksContainer = document.getElementById("books-container");
    if (!booksContainer) return;

    if (bookList.length === 0) {
        booksContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: var(--text-muted); padding: 40px 0;">No books matched your criteria.</p>';
        return;
    }

    booksContainer.innerHTML = bookList.map(book => createBookCard(book)).join("");
}
