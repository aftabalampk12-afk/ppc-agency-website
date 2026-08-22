/* =========================================
   PPCXPERTs
   Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const copyright = document.querySelector(".copyright");
    if (copyright) copyright.innerHTML = `© ${new Date().getFullYear()} PPCXPERTs. All Rights Reserved.`;

    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                const header = document.querySelector(".header");
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });

    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;
        question.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");
            faqItems.forEach(function (otherItem) {
                const otherQuestion = otherItem.querySelector(".faq-question");
                const otherAnswer = otherItem.querySelector(".faq-answer");
                otherItem.classList.remove("active");
                if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
                if (otherAnswer) otherAnswer.hidden = true;
            });
            if (!isOpen) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        });
    });

    /* -----------------------------------------
       Contact Form Validation
       ----------------------------------------- */
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        const status = document.querySelector("#form-status");
        const nameField = document.querySelector("#name");
        const emailField = document.querySelector("#email");
        const messageField = document.querySelector("#message");

        function setError(field, message) {
            const group = field.closest(".form-group");
            const error = group ? group.querySelector(".form-error") : null;
            if (group) group.classList.add("invalid");
            if (error) error.textContent = message;
        }

        function clearError(field) {
            const group = field.closest(".form-group");
            const error = group ? group.querySelector(".form-error") : null;
            if (group) group.classList.remove("invalid");
            if (error) error.textContent = "";
        }

        [nameField, emailField, messageField].forEach(function (field) {
            if (!field) return;
            field.addEventListener("input", function () { clearError(field); });
        });

        contactForm.addEventListener("submit", function (event) {
            let valid = true;
            if (status) { status.textContent = ""; status.classList.remove("error"); }

            if (!nameField.value.trim()) {
                setError(nameField, "Please enter your name.");
                valid = false;
            } else if (nameField.value.trim().length < 2) {
                setError(nameField, "Please enter a valid name.");
                valid = false;
            }

            const email = emailField.value.trim();
            if (!email) {
                setError(emailField, "Please enter your email address.");
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(emailField, "Please enter a valid email address.");
                valid = false;
            }

            if (!messageField.value.trim()) {
                setError(messageField, "Please tell us a little about your PPC needs.");
                valid = false;
            } else if (messageField.value.trim().length < 10) {
                setError(messageField, "Please provide at least 10 characters.");
                valid = false;
            }

            if (!valid) {
                event.preventDefault();
                const firstInvalid = contactForm.querySelector(".form-group.invalid input, .form-group.invalid textarea");
                if (firstInvalid) firstInvalid.focus();
                if (status) {
                    status.textContent = "Please correct the highlighted fields and try again.";
                    status.classList.add("error");
                }
            }
        });
    }

    const revealElements = document.querySelectorAll(".service-card, .process-card, .benefit, .stat, .about-box, .testimonial-card, .faq-item");
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(function (element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        revealObserver.observe(element);
    });

    const header = document.querySelector(".header");
    function handleHeaderScroll() {
        if (!header) return;
        header.style.boxShadow = window.scrollY > 20 ? "0 8px 30px rgba(15, 23, 42, 0.08)" : "none";
    }
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();

    const ctaButtons = document.querySelectorAll('a[href="#contact"], a[href*="wa.me"]');
    ctaButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log("CTA clicked:", this.textContent.trim());
        });
    });

    document.querySelectorAll(".bar").forEach(function (bar, index) {
        bar.style.animationDelay = `${index * 0.08}s`;
    });
});