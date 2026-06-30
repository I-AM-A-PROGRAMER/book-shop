// ====================
// CART STATE & PERSISTENCE
// js/cart.js
// ====================

let cart = []; // Empty cart to start

// Load cart from localStorage
const savedCart = localStorage.getItem("bookhive-cart");
if (savedCart) {
    try {
        cart = JSON.parse(savedCart);
    } catch (e) {
        console.error("Error parsing cart storage:", e);
        cart = [];
    }
}

// Add book to shopping cart
function addToCart(bookId) {
    // Find the book in the database (loaded from books.js)
    if (typeof books === "undefined") {
        console.error("Books database is not loaded.");
        return;
    }

    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert("Book not found!");
        return;
    }

    if (!book.inStock) {
        alert("Sorry, this book is out of stock!");
        return;
    }

    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        // Limit maximum quantity to 10
        if (existingItem.quantity >= 10) {
            showNotification(`Maximum limit of 10 reached for "${book.title}"`);
            return;
        }
        existingItem.quantity += 1;
    } else {
        // Add new item representation
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    // Save state, update UI badge, and show toast
    saveCart();
    updateCartCount();
    showNotification(`Added "${book.title}" to cart! 🛒`);

    // Dynamic callbacks if cart page is loaded
    if (typeof renderCart === "function") {
        renderCart();
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem("bookhive-cart", JSON.stringify(cart));
}

// Update the badge count in the navigation menu
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalQuantity;
    }
}

// Show a sleek notification toast
function showNotification(message) {
    // Check if there is already a container for notifications
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        // Inline style for positioning stack of notifications
        container.style.position = "fixed";
        container.style.top = "100px";
        container.style.right = "20px";
        container.style.zIndex = "1000";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }

    // Create individual notification card
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Append to container
    container.appendChild(notification);

    // Slide out and remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease-in forwards";
        setTimeout(() => {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000);
}

// Global Event Delegation for Add-to-cart clicks
document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("add-to-cart")) {
        const bookId = parseInt(e.target.getAttribute("data-id"));
        if (!isNaN(bookId)) {
            addToCart(bookId);
        }
    }
});

// Run initial badge load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
