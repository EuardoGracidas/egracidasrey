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

        // Optional autoplay (data-autoplay="ms"); pauses on hover/touch and when off-screen
        const delay = parseInt(track.dataset.autoplay, 10);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (delay && !reduce) {
            let paused = false, visible = false;
            wrap.addEventListener("mouseenter", () => paused = true);
            wrap.addEventListener("mouseleave", () => paused = false);
            wrap.addEventListener("touchstart", () => paused = true, { passive: true });
            if ("IntersectionObserver" in window) {
                new IntersectionObserver(es => es.forEach(e => visible = e.isIntersecting), { threshold: 0.4 }).observe(wrap);
            }
            setInterval(() => {
                if (paused || !visible || document.hidden || wrap.classList.contains("static")) return;
                const maxScroll = track.scrollWidth - track.clientWidth;
                if (track.scrollLeft >= maxScroll - 4) track.scrollTo({ left: 0 });
                else track.scrollBy({ left: step() });
            }, delay);
        }
    };
    // blurred background for single-image slides
    document.querySelectorAll(".gallery.showcase figure, .gallery.single-slider figure, .gallery.memorial-slider figure").forEach(f => {
        const img = f.querySelector("img");
        if (img) f.style.setProperty("--bg", `url("${img.getAttribute("src")}")`);
    });
    document.querySelectorAll(".gallery, .certs").forEach(el => {
        let cls = "";
        if (el.classList.contains("showcase")) cls = "single showcase";
        else if (el.classList.contains("single-slider") || el.classList.contains("memorial-slider")) cls = "single";
        makeCarousel(el, cls);
    });
    document.querySelectorAll(".card-imgs").forEach(el => {
        if (el.querySelectorAll("img").length > 1) {
            el.classList.remove("card-imgs");
            makeCarousel(el, "single card-carousel");
        }
    });

    // Thumbnail strip under the Moments showcase
    document.querySelectorAll(".carousel.showcase").forEach(wrap => {
        const track = wrap.querySelector(".carousel-track");
        const figs = [...track.children];
        const strip = document.createElement("div");
        strip.className = "thumbs";
        figs.forEach((f, i) => {
            const b = document.createElement("button");
            b.setAttribute("aria-label", "Show photo " + (i + 1));
            const im = f.querySelector("img");
            b.innerHTML = `<img src="${im.getAttribute("src")}" alt="" loading="lazy">`;
            b.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth }));
            strip.appendChild(b);
        });
        wrap.after(strip);
        const mark = () => {
            const i = Math.round(track.scrollLeft / track.clientWidth);
            [...strip.children].forEach((b, k) => b.classList.toggle("active", k === i));
            const act = strip.children[i];
            if (act) strip.scrollTo({ left: act.offsetLeft - strip.clientWidth / 2 + act.clientWidth / 2, behavior: "smooth" });
        };
        track.addEventListener("scroll", () => requestAnimationFrame(mark), { passive: true });
        mark();
    });

    // Certificate filters
    const certTrack = document.querySelector(".certs");
    document.querySelectorAll(".filters button").forEach(btn => btn.addEventListener("click", () => {
        document.querySelectorAll(".filters button").forEach(b => b.classList.toggle("active", b === btn));
        const f = btn.dataset.filter;
        certTrack.querySelectorAll(".cert").forEach(c => c.classList.toggle("hidden", f !== "all" && c.dataset.cat !== f));
        certTrack.scrollTo({ left: 0, behavior: "auto" });
        window.dispatchEvent(new Event("resize"));
    }));

    // Lightbox for gallery, card and certificate images
    const zoomables = [...document.querySelectorAll(".gallery img, .card-imgs img, .card-carousel img, .cert img, .c2i-logo, .framed img, .advance img, .memorial-portrait img, .docs img")];
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
    const show = (i, dir = 1) => {
        current = (i + zoomables.length) % zoomables.length;
        if (zoomables[current].closest(".cert.hidden")) {
            let guard = zoomables.length;
            while (zoomables[current].closest(".cert.hidden") && guard--) current = (current + dir + zoomables.length) % zoomables.length;
        }
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
    lb.querySelector("#lb-prev").addEventListener("click", e => { e.stopPropagation(); show(current - 1, -1); });
    lb.querySelector("#lb-next").addEventListener("click", e => { e.stopPropagation(); show(current + 1); });
    document.addEventListener("keydown", e => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1, -1);
        if (e.key === "ArrowRight") show(current + 1);
    });

    // Copy citation
    const copyBtn = document.getElementById("copy-cite");
    if (copyBtn) copyBtn.addEventListener("click", async () => {
        const text = document.getElementById("cite-text").innerText;
        try { await navigator.clipboard.writeText(text); }
        catch { const r = document.createRange(); r.selectNodeContents(document.getElementById("cite-text")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); document.execCommand("copy"); sel.removeAllRanges(); }
        copyBtn.textContent = UI[lang].copied;
        copyBtn.classList.add("copied");
        setTimeout(() => { copyBtn.textContent = UI[lang].copy; copyBtn.classList.remove("copied"); }, 2000);
    });

    // ---------- Language switch (EN / ES) ----------
    const I18N = window.I18N_ES || {};
    const INLINE = new Set(["EM", "STRONG", "B", "I", "BR", "SPAN", "A", "SUP", "SUB", "SMALL"]);
    const norm = h => h.replace(/\s+/g, " ").trim();
    const blocks = [];
    const collect = el => {
        for (const c of el.children) {
            if (c.closest("script,style,#lightbox,.thumbs,.lang-toggle,.visit-counter")) continue;
            if (/[A-Za-zÀ-ÿ]/.test(c.textContent) && c.tagName !== "BR" &&
                [...c.querySelectorAll("*")].every(d => INLINE.has(d.tagName))) {
                let t = c;
                while (t.childNodes.length === 1 && t.firstElementChild) t = t.firstElementChild;
                blocks.push({ el: t, en: t.innerHTML });
                continue;
            }
            collect(c);
        }
    };
    collect(document.body);
    const UI = {
        en: { copy: "Copy citation", copied: "Copied ✓", visitors: "unique visitors", visitor: "unique visitor" },
        es: { copy: "Copiar cita", copied: "¡Copiada! ✓", visitors: "visitantes únicos", visitor: "visitante único" }
    };
    let lang = "en";
    const setLang = l => {
        lang = l;
        blocks.forEach(b => {
            const tr = l === "es" ? I18N[norm(b.en)] : null;
            const html = tr || b.en;
            if (b.el.innerHTML !== html) b.el.innerHTML = html;
        });
        document.documentElement.lang = l;
        document.querySelectorAll(".lang-toggle button").forEach(btn => {
            const on = btn.dataset.lang === l;
            btn.classList.toggle("active", on);
            btn.setAttribute("aria-pressed", String(on));
        });
        try { localStorage.setItem("lang", l); } catch (e) {}
        updateVisitLabel();
        window.dispatchEvent(new Event("resize"));
    };
    document.querySelectorAll(".lang-toggle button").forEach(btn =>
        btn.addEventListener("click", () => setLang(btn.dataset.lang)));
    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    const initial = saved || ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en");
    setLang(initial);

    // Reading progress bar
    const prog = document.getElementById("progress");
    if (prog) {
        const upd = () => {
            const h = document.documentElement.scrollHeight - innerHeight;
            prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
        };
        addEventListener("scroll", upd, { passive: true });
        upd();
    }

    // ---------- Unique visitor counter ----------
    // Counts each browser only once: the first visit calls /hit (+1) and stores a
    // marker in localStorage (and a 2-year cookie as a backup); later visits only read
    // the value with /get. Local previews (file://, localhost) never increment it.
    const COUNTER = "https://abacus.jasoncameron.dev";
    const NS = "euardogracidas.github.io", KEY = "egracidasrey-unique-visitors";
    const MARK = "eg-visitor-counted";
    const counterBox = document.querySelector(".visit-counter");
    const countEl = document.getElementById("visit-count");
    var visitValue = null;
    function updateVisitLabel() {
        const lbl = document.getElementById("visit-label");
        if (lbl) lbl.textContent = visitValue === 1 ? UI[lang].visitor : UI[lang].visitors;
        const ce = document.getElementById("visit-count");
        if (ce && visitValue != null) ce.textContent = visitValue.toLocaleString(lang === "es" ? "es-MX" : "en-CA");
    }
    const alreadyCounted = () => {
        try { if (localStorage.getItem(MARK)) return true; } catch (e) {}
        return document.cookie.split("; ").some(c => c.startsWith(MARK + "="));
    };
    const markCounted = () => {
        try { localStorage.setItem(MARK, new Date().toISOString()); } catch (e) {}
        document.cookie = MARK + "=1; max-age=" + 60 * 60 * 24 * 730 + "; path=/; SameSite=Lax";
    };
    const isLocal = !/^https?:$/.test(location.protocol) || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    const isBot = /bot|crawl|spider|slurp|headless|lighthouse/i.test(navigator.userAgent);
    (async () => {
        if (!counterBox) return;
        const shouldHit = !isLocal && !isBot && !alreadyCounted();
        try {
            const r = await fetch(`${COUNTER}/${shouldHit ? "hit" : "get"}/${NS}/${KEY}`, { cache: "no-store" });
            if (!r.ok) return;
            const data = await r.json();
            if (typeof data.value !== "number") return;
            if (shouldHit) markCounted();
            visitValue = data.value;
            updateVisitLabel();
            counterBox.hidden = false;
        } catch (e) { /* counter service unavailable: keep it hidden */ }
    })();

    // ---------- Dark mode ----------
    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
    });
    if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        let saved = null;
        try { saved = localStorage.getItem("theme"); } catch (err) {}
        if (!saved) document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    });

    // Back-to-top button
    const toTop = document.getElementById("to-top");
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
});
