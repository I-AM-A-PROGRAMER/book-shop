// ====================
// LOGIN PAGE LOGIC
// js/login.js
// ====================

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("toggle-password");

    // 1. Password Visibility Toggle
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleBtn.textContent = "🙈";
            } else {
                passwordInput.type = "password";
                toggleBtn.textContent = "👁️";
            }
        });
    }

    // 2. Form Submission & Validation
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Stop default refresh

            const email = document.getElementById("email").value.trim();
            const password = passwordInput.value;

            // Basic Regex Email Check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return;
            }

            // Create logged-in user session
            const userSession = {
                email: email,
                loginTime: new Date().toISOString(),
                isLoggedIn: true
            };

            localStorage.setItem("bookhive-session", JSON.stringify(userSession));

            // Optional: If user already exists in signup data, welcome them by name!
            const registeredUser = localStorage.getItem("bookhive-user");
            let welcomeName = email.split("@")[0]; // Fallback to email prefix
            if (registeredUser) {
                try {
                    const userData = JSON.parse(registeredUser);
                    if (userData.email === email) {
                        welcomeName = userData.fullname;
                    }
                } catch (e) {
                    console.error("Error reading registered user data:", e);
                }
            }

            alert(`Welcome back to BookHive, ${welcomeName}! 🛒`);

            // Redirect to homepage
            window.location.href = "index.html";
        });
    }
});
