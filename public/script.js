/* =========================================
   PPCXPERTs
   Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       Current Year
       ----------------------------------------- */
    const copyright = document.querySelector(".copyright");
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = `© ${currentYear} PPCXPERTs. All Rights Reserved.`;
    }

    /* -----------------------------------------
       Smooth Scrolling
       ----------------------------------------- */
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

    /* -----------------------------------------
       FAQ Accordion
       ----------------------------------------- */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;

        question.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");

            /* Close other FAQ items for a clean accordion experience. */
            faqItems.forEach(function (otherItem) {
                const otherQuestion = otherItem.querySelector(".faq-question");
                const otherAnswer = otherItem.querySelector(".faq-answer");
                otherItem.classList.remove("active");
                if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
                if (otherAnswer) otherAnswer.hidden = true;
            });

            /* Toggle the clicked item. */
            if (!isOpen) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        });
    });

    /* -----------------------------------------
       Scroll Reveal Animation
       ----------------------------------------- */
    const revealElements = document.querySelectorAll(
        ".service-card, .process-card, .benefit, .stat, .about-box, .testimonial-card, .faq-item"
    );

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        revealObserver.observe(element);
    });

    /* -----------------------------------------
       Header Shadow On Scroll
       ----------------------------------------- */
    const header = document.querySelector(".header");
    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 30px rgba(15, 23, 42, 0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    }
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();

    /* -----------------------------------------
       Button Click Tracking
       ----------------------------------------- */
    const ctaButtons = document.querySelectorAll(
        'a[href="#contact"], a[href^="mailto:"], a[href*="wa.me"]'
    );
    ctaButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log("CTA clicked:", this.textContent.trim());
        });
    });

    /* -----------------------------------------
       Simple Hero Chart Animation
       ----------------------------------------- */
    const bars = document.querySelectorAll(".bar");
    bars.forEach(function (bar, index) {
        bar.style.animationDelay = `${index * 0.08}s`;
    });

});