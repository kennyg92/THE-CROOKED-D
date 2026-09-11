/*==================================================
  CROOKED D CREAMERY
  MAIN JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");

    /* NAVBAR SCROLL EFFECT */
    function updateNavbar() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 80);
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    /* MOBILE MENU CLOSE */
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navCollapse?.classList.contains("show")) {
                bootstrap.Collapse.getInstance(navCollapse)?.hide();
            }
        });
    });

    /* SAME-PAGE SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });

    /* HERO PARALLAX */
    const hero = document.querySelector(".hero");
    if (hero) {
        window.addEventListener("scroll", () => {
            hero.style.backgroundPositionY = `${window.pageYOffset * 0.4}px`;
        }, { passive: true });
    }

    /* ACTIVE NAVIGATION — ONLY SAME-PAGE HASH LINKS */
    const sections = document.querySelectorAll("section[id]");
    const hashNavItems = document.querySelectorAll('.nav-link[href^="#"]');

    function activateNav() {
        if (!sections.length || !hashNavItems.length) return;

        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            if (window.pageYOffset >= top && window.pageYOffset < bottom) {
                current = section.id;
            }
        });

        hashNavItems.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    }

    if (hashNavItems.length) {
        activateNav();
        window.addEventListener("scroll", activateNav, { passive: true });
    }

    /* BACK TO TOP */
    const topButton = document.createElement("button");
    topButton.type = "button";
    topButton.innerHTML = "↑";
    topButton.className = "back-to-top";
    topButton.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topButton);

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        topButton.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    /* CURRENT YEAR */
    const year = document.querySelector(".current-year");
    if (year) year.textContent = new Date().getFullYear();
});
