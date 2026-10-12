tailwind.config = {
    theme: {
        extend: {
            colors: {
                black: "#101010",
                charcoal: "#1C1C1C",
                brand: "#FFD700",
                light: "#F5F0E8",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
        },
    },
};

const whatsappNumber = "923015231010";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();

    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("nav-scrolled", window.scrollY > 50);
    });

    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("open");
        document.body.style.overflow = "hidden";
    });

    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
    };

    menuClose.addEventListener("click", closeMenu);
    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealOnScroll = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            },
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal-pending");
            revealOnScroll.observe(element);
        });
    }

    const bookingForm = document.getElementById("bookingForm");
    const formStatus = document.getElementById("formStatus");
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const service = bookingForm.elements.service.selectedOptions[0].text;
        const message = [
            "Assalam-o-alaikum, I would like to book an appointment at M. Cutting Studio.",
            "",
            `Name: ${formData.get("name")}`,
            `Phone: ${formData.get("phone")}`,
            `Service: ${service}`,
            `Preferred date: ${formData.get("date")}`,
            `Preferred time: ${formData.get("time")}`,
        ].join("\n");
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        formStatus.classList.remove("hidden");
    });

    const dateInput = document.getElementById("appointmentDate");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    dateInput.min = localToday;
});
