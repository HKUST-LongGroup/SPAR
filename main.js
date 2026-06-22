/* SPAR project page — interactions */
(function () {
  "use strict";

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = lightbox.querySelector(".lightbox__img");
  const lbCaption = lightbox.querySelector(".lightbox__caption");
  const lbClose = lightbox.querySelector(".lightbox__close");
  const lbBackdrop = lightbox.querySelector(".lightbox__backdrop");

  function openLightbox(src, alt, caption) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lbCaption.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox");
      const img = el.querySelector("img");
      const figcap = el.closest(".card--media")
        ? el.closest(".card--media").querySelector(".caption")
        : null;
      openLightbox(src, img ? img.alt : "", figcap ? figcap.textContent.trim() : "");
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lbBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  /* ---------- Copy BibTeX ---------- */
  const copyBtn = document.getElementById("copyBibtex");
  const bibBlock = document.getElementById("bibtexBlock");
  if (copyBtn && bibBlock) {
    copyBtn.addEventListener("click", async () => {
      const text = bibBlock.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      const original = copyBtn.textContent;
      copyBtn.textContent = "✓ Copied!";
      setTimeout(() => (copyBtn.textContent = original), 1600);
    });
  }

  /* ---------- Active nav highlight ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((l) =>
              l.style.setProperty(
                "color",
                l.getAttribute("href") === id ? "var(--hkust-blue)" : ""
              )
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
  }
})();
