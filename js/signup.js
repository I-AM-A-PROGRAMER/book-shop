// ====================
// SIGNUP PAGE LOGIC
// js/signup.js
// ====================

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            // STOP the page from refreshing
            event.preventDefault();

            // Get form values
            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            const city = document.getElementById("city").value;
            const terms = document.getElementById("terms").checked;

            // ====================
            // VALIDATION
            // ====================

            // 1. Name Check (at least 3 characters)
            if (fullname.length < 3) {
                alert("Please enter your full name (at least 3 characters).");
                return;
            }

            // 2. Email Check (basic regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // 3. Phone Check (optional, must be exactly 10 digits if provided)
            if (phone && !/^[0-9]{10}$/.test(phone)) {
                alert("Phone number must be exactly 10 digits.");
                return;
            }

            // 4. Password Strength Check (at least 8 characters)
            if (password.length < 8) {
                alert("Password must be at least 8 characters.");
                return;
            }

            // 5. Password Match Check
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // 6. Terms Check
            if (!terms) {
                alert("Please accept the Terms and Conditions.");
                return;
            }

            // ====================
            // ALL CHECKS PASSED
            // ====================

            // Create user object
            const newUser = {
                fullname: fullname,
                email: email,
                phone: phone,
                city: city,
                signupDate: new Date().toISOString()
            };

            // Save user representation to localStorage
            localStorage.setItem("bookhive-user", JSON.stringify(newUser));

            // Log in the user session immediately
            const userSession = {
                email: email,
                loginTime: new Date().toISOString(),
                isLoggedIn: true
            };
            localStorage.setItem("bookhive-session", JSON.stringify(userSession));

            // Show success alert
            alert(`Welcome to BookHive, ${fullname}! 🛒 Account created successfully.`);

            // Redirect to homepage
            window.location.href = "index.html";
        });
    }
});
