document.addEventListener("DOMContentLoaded", () => {
    // Footer year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Mobile menu
    const toggle = document.getElementById("menu-toggle");
    const links = document.getElementById("nav-links");
    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(a =>
        a.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        })
    );

    // Reveal sections on scroll
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add("visible");
                    revealObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        reveals.forEach(el => revealObs.observe(el));

        // Highlight current section in the navbar
        const navMap = {};
        links.querySelectorAll("a").forEach(a => navMap[a.getAttribute("href").slice(1)] = a);
        const sectionObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    Object.values(navMap).forEach(a => a.classList.remove("active"));
                    const a = navMap[e.target.id];
                    if (a) a.classList.add("active");
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        document.querySelectorAll("main section[id]").forEach(s => sectionObs.observe(s));
    } else {
        reveals.forEach(el => el.classList.add("visible"));
    }

    // Back-to-top button
    const toTop = document.getElementById("to-top");
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
});
