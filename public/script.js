/* =========================================
   PPCXPERTs
   Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const copyright = document.querySelector(".copyright");
    if (copyright) copyright.innerHTML = `© ${new Date().getFullYear()} PPCXPERTs. All Rights Reserved.`;

    /* -----------------------------------------
       Responsive Mobile Hamburger Navigation
       ----------------------------------------- */
    const header = document.querySelector(".header");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelector(".nav-links");

    if (header && nav && navLinks) {
        const mobileStyle = document.createElement("style");
        mobileStyle.textContent = `
            .mobile-menu-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:1px solid rgba(22,101,52,.18);border-radius:11px;background:rgba(255,255,255,.72);color:#14532d;cursor:pointer;flex:0 0 auto;transition:all .25s ease}
            .mobile-menu-toggle:hover{background:#dcfce7;border-color:rgba(22,163,74,.35);color:#166534}
            .mobile-menu-toggle .hamburger-lines,.mobile-menu-toggle .hamburger-lines:before,.mobile-menu-toggle .hamburger-lines:after{display:block;width:20px;height:2px;border-radius:2px;background:currentColor;transition:transform .25s ease,opacity .2s ease}
            .mobile-menu-toggle .hamburger-lines{position:relative}
            .mobile-menu-toggle .hamburger-lines:before,.mobile-menu-toggle .hamburger-lines:after{content:"";position:absolute;left:0}
            .mobile-menu-toggle .hamburger-lines:before{top:-6px}.mobile-menu-toggle .hamburger-lines:after{top:6px}
            .mobile-menu-toggle[aria-expanded="true"] .hamburger-lines{background:transparent}
            .mobile-menu-toggle[aria-expanded="true"] .hamburger-lines:before{transform:translateY(6px) rotate(45deg)}
            .mobile-menu-toggle[aria-expanded="true"] .hamburger-lines:after{transform:translateY(-6px) rotate(-45deg)}
            @media(max-width:767px){
                .nav{position:relative;flex-wrap:wrap}
                .mobile-menu-toggle{display:flex;order:3}
                .nav-button{order:2;margin-left:auto}
                .nav-links{display:none;order:4;flex-basis:100%;width:100%;flex-direction:column;align-items:stretch;gap:4px;margin-top:4px;padding:8px;border-radius:14px;background:rgba(255,255,255,.97);box-shadow:0 14px 30px rgba(15,23,42,.12)}
                .nav-links.mobile-open{display:flex}
                .nav-links a{width:100%;padding:12px 14px;text-align:left;font-size:14px}
                .nav-links a:after{display:none}
            }
            @media(min-width:768px){.mobile-menu-toggle{display:none!important}.nav-links{display:flex!important}}
        `;
        document.head.appendChild(mobileStyle);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "mobile-menu-toggle";
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", "mobile-navigation");
        toggle.innerHTML = '<span class="hamburger-lines" aria-hidden="true"></span>';
        navLinks.id = "mobile-navigation";
        nav.insertBefore(toggle, navLinks);

        function closeMobileMenu() {
            navLinks.classList.remove("mobile-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation menu");
        }

        toggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("mobile-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768) closeMobileMenu();
        });
    }

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

    function handleHeaderScroll() {
        const currentHeader = document.querySelector(".header");
        if (!currentHeader) return;
        currentHeader.style.boxShadow = window.scrollY > 20 ? "0 8px 30px rgba(15, 23, 42, 0.08)" : "none";
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