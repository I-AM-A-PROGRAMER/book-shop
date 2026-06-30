// ====================
// CONTACT PAGE LOGIC
// js/contact.js
// ====================

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page refresh

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value.trim();

            // ====================
            // VALIDATION
            // ====================

            if (name.length < 2) {
                alert("Please enter a valid name (at least 2 characters).");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (message.length < 10) {
                alert("Please write a message of at least 10 characters.");
                return;
            }

            // ====================
            // SUCCESS ACTION
            // ====================

            // Log details (in production, sent to email service or server)
            console.log("Contact submission received:", { name, email, subject, message });

            // Display feedback message
            if (typeof showNotification === "function") {
                showNotification("Thank you! Your message has been sent successfully. 📬");
            } else {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
            }

            // Reset the form
            contactForm.reset();
        });
    }
});
