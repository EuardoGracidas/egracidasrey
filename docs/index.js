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

    // Lightbox for gallery, card and certificate images
    const zoomables = [...document.querySelectorAll(".gallery img, .card-imgs img, .cert img, .c2i-logo")];
    const lb = document.createElement("div");
    lb.id = "lightbox";
    lb.innerHTML = '<button id="lb-close" aria-label="Close">&times;</button>' +
        '<button id="lb-prev" aria-label="Previous">&#8249;</button>' +
        '<img alt=""><p></p>' +
        '<button id="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector("img");
    const lbCap = lb.querySelector("p");
    let current = 0;
    const show = i => {
        current = (i + zoomables.length) % zoomables.length;
        const img = zoomables[current];
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        const cap = img.closest("figure")?.querySelector("figcaption");
        lbCap.innerHTML = cap ? cap.innerHTML : img.alt;
        lb.classList.add("open");
    };
    const close = () => lb.classList.remove("open");
    zoomables.forEach((img, i) => img.addEventListener("click", () => show(i)));
    lb.addEventListener("click", e => { if (e.target === lb || e.target === lbImg || e.target.id === "lb-close") close(); });
    lb.querySelector("#lb-prev").addEventListener("click", e => { e.stopPropagation(); show(current - 1); });
    lb.querySelector("#lb-next").addEventListener("click", e => { e.stopPropagation(); show(current + 1); });
    document.addEventListener("keydown", e => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });

    // Back-to-top button
    const toTop = document.getElementById("to-top");
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
});
