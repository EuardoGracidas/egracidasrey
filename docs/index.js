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

    // Carousels: galleries and certificates become horizontal sliders.
    // Arrows and dots only appear when the items don't fit (otherwise it stays static).
    const makeCarousel = (track, extraClass) => {
        const wrap = document.createElement("div");
        wrap.className = "carousel" + (extraClass ? " " + extraClass : "");
        track.parentNode.insertBefore(wrap, track);
        wrap.appendChild(track);
        track.classList.add("carousel-track");

        const prev = document.createElement("button");
        prev.className = "carousel-btn prev";
        prev.setAttribute("aria-label", "Previous");
        prev.innerHTML = "&#8249;";
        const next = document.createElement("button");
        next.className = "carousel-btn next";
        next.setAttribute("aria-label", "Next");
        next.innerHTML = "&#8250;";
        const dots = document.createElement("div");
        dots.className = "carousel-dots";
        wrap.append(prev, next, dots);

        const step = () => {
            const item = track.firstElementChild;
            if (!item) return track.clientWidth;
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            const itemW = item.getBoundingClientRect().width + gap;
            return Math.max(itemW, Math.floor((track.clientWidth + gap) / itemW) * itemW);
        };
        const pages = () => Math.max(1, Math.ceil((track.scrollWidth - track.clientWidth) / step() - 0.05) + 1);
        const update = () => {
            const needed = track.scrollWidth > track.clientWidth + 4;
            wrap.classList.toggle("static", !needed);
            if (!needed) return;
            const n = pages();
            const maxScroll = track.scrollWidth - track.clientWidth;
            const idx = track.scrollLeft >= maxScroll - 4 ? n - 1 : Math.round(track.scrollLeft / step());
            prev.disabled = track.scrollLeft <= 4;
            next.disabled = track.scrollLeft >= maxScroll - 4;
            if (n > 8) {
                dots.classList.add("counter");
                dots.textContent = (idx + 1) + " / " + n;
                return;
            }
            dots.classList.remove("counter");
            if (dots.children.length !== n) {
                dots.innerHTML = "";
                for (let i = 0; i < n; i++) {
                    const d = document.createElement("button");
                    d.setAttribute("aria-label", "Go to slide " + (i + 1));
                    d.addEventListener("click", () => track.scrollTo({ left: i * step() }));
                    dots.appendChild(d);
                }
            }
            [...dots.children].forEach((d, i) => d.classList.toggle("active", i === idx));
        };
        prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
        next.addEventListener("click", () => track.scrollBy({ left: step() }));
        track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
        window.addEventListener("resize", update);
        track.querySelectorAll("img").forEach(img => img.addEventListener("load", update));
        update();
    };
    document.querySelectorAll(".gallery, .certs").forEach(el => makeCarousel(el));
    document.querySelectorAll(".card-imgs").forEach(el => {
        if (el.querySelectorAll("img").length > 1) {
            el.classList.remove("card-imgs");
            makeCarousel(el, "single card-carousel");
        }
    });

    // Lightbox for gallery, card and certificate images
    const zoomables = [...document.querySelectorAll(".gallery img, .card-imgs img, .card-carousel img, .cert img, .c2i-logo")];
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
