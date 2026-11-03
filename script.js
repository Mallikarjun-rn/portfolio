
// =======================================
// MALLIKARJUN NEERALAGI - PORTFOLIO JS
// =======================================


// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");

menuToggle.addEventListener("click", () => {

    const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
    );

    navLinks.classList.toggle("open", !isOpen);

});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

    });

});


// HEADER APPEARANCE AND SCROLL PROGRESS

const progressBar =
    document.querySelector(".scroll-progress");

function updateScrollUI() {

    const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

    progressBar.style.width = `${progress}%`;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

}

window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);

updateScrollUI();


// SCROLL REVEAL ANIMATIONS

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


document.querySelectorAll(".reveal").forEach((element) => {

    revealObserver.observe(element);

});


// ACTIVE NAVIGATION SECTION

const sections =
    document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                document.querySelectorAll(".nav-links a").forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    );

                });

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);


sections.forEach((section) => {

    navObserver.observe(section);

});


// IMAGE FALLBACK
// Prevent broken image icons if a file is missing.

document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

        if (img.classList.contains("profile-photo")) {

            img.style.display = "none";

        } else if (img.classList.contains("project-image")) {

            const container = img.closest(
                ".project-image-container"
            );

            if (container) {

                img.style.display = "none";

                container.classList.add("image-missing");

            }

        }

    });

});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();

