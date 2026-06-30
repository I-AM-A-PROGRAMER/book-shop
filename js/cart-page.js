// ====================
// SHOPPING CART PAGE LOGIC
// js/cart-page.js
// ====================

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryTax = document.getElementById("summary-tax");
const summaryTotal = document.getElementById("summary-total");

function renderCart() {
    if (!cartItemsContainer) return;

    // Retrieve global cart from cart.js
    if (typeof cart === "undefined") {
        console.error("Cart state is not loaded.");
        return;
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 40px; font-size: 1.1rem; color: var(--text-muted);">
                    Your shopping cart is empty. <a href="books.html" style="color: var(--primary); font-weight: bold; text-decoration: underline;">Browse books</a>
                </td>
            </tr>
        `;
        if (cartTotalElement) cartTotalElement.textContent = "₹0";
        if (summarySubtotal) summarySubtotal.textContent = "₹0";
        if (summaryTax) summaryTax.textContent = "₹0";
        if (summaryTotal) summaryTotal.innerHTML = "<strong>₹0</strong>";
        return;
    }

    // Generate table rows HTML
    const rowsHTML = cart.map(item => `
        <tr data-id="${item.id}">
            <td>
                <img src="${item.image}" alt="${item.title}" width="60" style="border-radius: 4px;">
            </td>
            <td>
                <strong>${item.title}</strong><br>
                <small style="color: var(--text-muted);">${item.author}</small>
            </td>
            <td>₹${item.price}</td>
            <td>
                <input 
                    type="number" 
                    value="${item.quantity}" 
                    min="1" 
                    max="10" 
                    class="qty-input" 
                    data-id="${item.id}"
                >
            </td>
            <td>₹${item.price * item.quantity}</td>
            <td>
                <button class="remove-btn" data-id="${item.id}" style="font-size: 1.1rem; cursor: pointer;">❌</button>
            </td>
        </tr>
    `).join("");

    cartItemsContainer.innerHTML = rowsHTML;

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST rounded to 2 decimals
    const total = subtotal + tax;

    if (cartTotalElement) cartTotalElement.textContent = `₹${subtotal}`;
    if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal}`;
    if (summaryTax) summaryTax.textContent = `₹${tax.toFixed(2)}`;
    if (summaryTotal) summaryTotal.innerHTML = `<strong>₹${total.toFixed(2)}</strong>`;

    // Attach listeners
    attachQuantityListeners();
    attachRemoveListeners();
}

function attachQuantityListeners() {
    const inputs = document.querySelectorAll(".qty-input");
    inputs.forEach(input => {
        input.addEventListener("change", function() {
            const id = parseInt(this.getAttribute("data-id"));
            let newQty = parseInt(this.value);

            if (isNaN(newQty) || newQty < 1) newQty = 1;
            if (newQty > 10) {
                newQty = 10;
                this.value = 10;
                if (typeof showNotification === "function") {
                    showNotification("Maximum item quantity is 10.");
                }
            }

            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity = newQty;
                if (typeof saveCart === "function") saveCart();
                renderCart();
                if (typeof updateCartCount === "function") updateCartCount();
            }
        });
    });
}

function attachRemoveListeners() {
    const buttons = document.querySelectorAll(".remove-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            const title = item ? item.title : "this item";

            if (confirm(`Remove "${title}" from cart?`)) {
                cart = cart.filter(i => i.id !== id);
                if (typeof saveCart === "function") saveCart();
                renderCart();
                if (typeof updateCartCount === "function") updateCartCount();
                if (typeof showNotification === "function") {
                    showNotification(`Removed "${title}" from cart.`);
                }
            }
        });
    });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
