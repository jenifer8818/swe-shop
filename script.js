/* ========= Smooth Scrolling for top nav ========= */
document.querySelectorAll(".topnav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // allow normal anchor behavior if link is off-page
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});



/* ========= Back to Top ========= */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);



/* ========= Search (works across sections) ========= */
const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", function () {
  const q = this.value.trim().toLowerCase();
  document.querySelectorAll(".container").forEach(section => {
    const grid = section.querySelector(".products");
    if (!grid) return;
    Array.from(grid.children).forEach(card => {
      const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
      card.style.display = name.includes(q) ? "" : "none";
    });
  });
});

/* ========= Sort within each section (not mixing) ========= */
function parsePriceFrom(card) {
  // find the first number (₹ or $ supported)
  const txt = Array.from(card.querySelectorAll("p"))
    .map(p => p.textContent)
    .join(" ")
    .replace(/,/g, "");
  const m = txt.match(/(?:₹|\$)?\s*(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : Number.POSITIVE_INFINITY;
}

// Save initial order per section so "default" restores it
function snapshotInitialOrder() {
  document.querySelectorAll(".container").forEach(section => {
    if (section.id === "featured") return; // skip featured clones
    const grid = section.querySelector(".products");
    if (!grid) return;
    Array.from(grid.children).forEach((card, idx) => {
      card.dataset.initialIndex = String(idx);
    });
  });
}
snapshotInitialOrder();

document.getElementById("sort-options").addEventListener("change", function () {
  const sortValue = this.value;
  document.querySelectorAll(".container").forEach(section => {
    if (section.id === "featured") return; // do not sort the featured clones
    const grid = section.querySelector(".products");
    if (!grid) return;

    const cards = Array.from(grid.children);
    if (sortValue === "default") {
      cards.sort((a, b) => (+a.dataset.initialIndex) - (+b.dataset.initialIndex));
    } else {
      cards.sort((a, b) => {
        const priceA = parsePriceFrom(a);
        const priceB = parsePriceFrom(b);
        return sortValue === "low-high" ? priceA - priceB : priceB - priceA;
      });
    }
    cards.forEach(c => grid.appendChild(c));
  });
});

 // Featured random products (2 rows)
    window.addEventListener("DOMContentLoaded", () => {
      const featuredContainer = document.getElementById("featured-products");
      if (!featuredContainer) return;

      const cards = Array.from(document.querySelectorAll(
        "#bracelets .product, #earrings .product, #charms .product, #keychains .product, #neckpieces .product"
      ));

      const shuffled = cards.map(c => ({ c, r: Math.random() }))
                            .sort((a, b) => a.r - b.r)
                            .slice(0, 8) // 8 products = 2 rows
                            .map(x => x.c);

      shuffled.forEach(card => featuredContainer.appendChild(card.cloneNode(true)));
    });

    function sendToWhatsApp(event) {
  event.preventDefault(); // stop form from refreshing

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  // Your WhatsApp number in correct format
  const phoneNumber = "919789458556";  

  const url = `https://wa.me/${phoneNumber}?text=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
