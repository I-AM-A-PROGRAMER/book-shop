// ====================
// SEARCH & FILTER LOGIC
// js/search.js
// ====================

document.addEventListener("DOMContentLoaded", () => {
    // Get search, filter, and sorting DOM elements
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const sortSelect = document.getElementById("sort");

    if (!searchInput || !categoryFilter || !sortSelect) {
        console.warn("Catalog filter controls not found on this page.");
        return;
    }

    // Function that filters and sorts books
    function applyFilters() {
        if (typeof books === "undefined") return;

        // Show loading spinner
        if (typeof showLoader === "function") showLoader();

        // Simulate network latency for visual polish
        setTimeout(() => {
            let filteredBooks = [...books]; // Copy database

            // 1. Search filter (match title or author)
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                filteredBooks = filteredBooks.filter(book => 
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm)
                );
            }

            // 2. Category filter
            const selectedCategory = categoryFilter.value;
            if (selectedCategory && selectedCategory !== "all") {
                filteredBooks = filteredBooks.filter(book => 
                    book.category === selectedCategory
                );
            }

            // 3. Sorting logic
            const sortBy = sortSelect.value;
            switch (sortBy) {
                case "price-low":
                    filteredBooks.sort((a, b) => a.price - b.price);
                    break;
                case "price-high":
                    filteredBooks.sort((a, b) => b.price - a.price);
                    break;
                case "rating":
                    filteredBooks.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    // Default sorting (by book ID)
                    filteredBooks.sort((a, b) => a.id - b.id);
            }

            // 4. Render to grid
            if (typeof renderBooks === "function") {
                renderBooks(filteredBooks);
            }

            // 5. Update results counter text
            showResultCount(filteredBooks.length);
        }, 300);
    }

    // Displays dynamic counter text for matched results
    function showResultCount(count) {
        let countDisplay = document.getElementById("result-count");
        if (!countDisplay) {
            countDisplay = document.createElement("p");
            countDisplay.id = "result-count";
            countDisplay.style.textAlign = "center";
            countDisplay.style.color = "var(--text-muted)";
            countDisplay.style.marginBottom = "var(--space-md)";
            countDisplay.style.fontWeight = "600";
            
            const grid = document.getElementById("books-container");
            if (grid && grid.parentNode) {
                grid.parentNode.insertBefore(countDisplay, grid);
            }
        }
        countDisplay.textContent = `Showing ${count} book${count !== 1 ? 's' : ''}`;
    }

    // Attach Event Listeners
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
    sortSelect.addEventListener("change", applyFilters);

    // Initial filter run on page load
    applyFilters();

    // Support quick category links from homepage or navbar
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("category");
    if (catParam) {
        const option = Array.from(categoryFilter.options).find(opt => opt.value === catParam);
        if (option) {
            categoryFilter.value = catParam;
            applyFilters();
        }
    }
});
