const results = [
  { slug: "cathedral", name: "Cathedral", source: "course", method: "Single-scale", g: [2, 5], r: [3, 12], runtime: 0.2385 },
  { slug: "monastery", name: "Monastery", source: "course", method: "Single-scale", g: [2, -3], r: [2, 3], runtime: 0.2736 },
  { slug: "tobolsk", name: "Tobolsk", source: "course", method: "Single-scale", g: [3, 3], r: [3, 6], runtime: 0.2730 },
  { slug: "church", name: "Church", source: "course", method: "Pyramid", g: [3, 25], r: [-4, 59], runtime: 3.5931 },
  { slug: "emir", name: "Emir", source: "course", method: "Pyramid", g: [24, 49], r: [44, 68], runtime: 3.2970 },
  { slug: "harvesters", name: "Harvesters", source: "course", method: "Pyramid", g: [16, 60], r: [13, 124], runtime: 3.3172 },
  { slug: "icon", name: "Icon", source: "course", method: "Pyramid", g: [17, 41], r: [23, 89], runtime: 3.4108 },
  { slug: "ilemselga", name: "Ilemselga", source: "course", method: "Pyramid", g: [6, 40], r: [9, 130], runtime: 4.1116 },
  { slug: "melons", name: "Melons", source: "course", method: "Pyramid", g: [10, 83], r: [12, 178], runtime: 3.1250 },
  { slug: "religous_painting", name: "Religious Painting", source: "course", method: "Pyramid", g: [4, 28], r: [7, 68], runtime: 3.4041 },
  { slug: "self_portrait", name: "Self Portrait", source: "course", method: "Pyramid", g: [29, 79], r: [36, 176], runtime: 4.0586 },
  { slug: "siren", name: "Siren", source: "course", method: "Pyramid", g: [-7, 49], r: [-25, 96], runtime: 3.3254 },
  { slug: "three_generations", name: "Three Generations", source: "course", method: "Pyramid", g: [13, 54], r: [10, 112], runtime: 3.4230 },
  { slug: "wharf", name: "Wharf", source: "course", method: "Pyramid", g: [-7, 15], r: [-17, 83], runtime: 3.7316 },
  { slug: "00154", name: "Plate 00154", source: "selected", method: "Pyramid", g: [-5, 50], r: [-19, 111], runtime: 3.2176 },
  { slug: "00203", name: "Plate 00203", source: "selected", method: "Pyramid", g: [17, 78], r: [8, 154], runtime: 3.3118 },
  { slug: "00216", name: "Plate 00216", source: "selected", method: "Pyramid", g: [13, 37], r: [38, 86], runtime: 3.4199 },
  { slug: "00245", name: "Plate 00245", source: "selected", method: "Pyramid", g: [-7, 28], r: [-18, 108], runtime: 3.2648 },
  { slug: "00276", name: "Plate 00276", source: "selected", method: "Pyramid", g: [12, 43], r: [23, 138], runtime: 3.6926 },
];

const imagePath = (item) => `assets/images/${item.slug}.jpg`;
const offsetText = ([x, y]) => `(${x}, ${y})`;

function createResultCard(item) {
  const article = document.createElement("article");
  article.className = "result-card";

  const index = results.indexOf(item);
  article.innerHTML = `
    <button class="result-open" type="button" data-result-index="${index}" aria-label="Open ${item.name} at full size">
      <img src="${imagePath(item)}" alt="Colorized result for ${item.name}" loading="lazy" decoding="async">
    </button>
    <div class="result-caption">
      <div class="result-title-row">
        <h4>${item.name}</h4>
        <span class="method-label">${item.method}</span>
      </div>
      <div class="offsets">
        <span>G→B <strong>${offsetText(item.g)}</strong></span>
        <span>R→B <strong>${offsetText(item.r)}</strong></span>
      </div>
    </div>
  `;
  return article;
}

function renderGallery(containerId, items) {
  const container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(createResultCard(item)));
  container.replaceChildren(fragment);
}

renderGallery("single-gallery", results.filter((item) => item.method === "Single-scale"));
renderGallery(
  "pyramid-gallery",
  results.filter((item) => item.source === "course" && item.method === "Pyramid"),
);
renderGallery("selected-gallery", results.filter((item) => item.source === "selected"));

const tableBody = document.getElementById("results-table-body");

function renderTable(filter = "all") {
  const visibleResults = filter === "all"
    ? results
    : results.filter((item) => item.source === filter);

  tableBody.innerHTML = visibleResults.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.source === "course" ? "Course" : "Selected"}</td>
      <td>${item.method}</td>
      <td>${offsetText(item.g)}</td>
      <td>${offsetText(item.r)}</td>
      <td>${item.runtime.toFixed(4)} s</td>
    </tr>
  `).join("");
}

renderTable();

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((candidate) => {
      candidate.setAttribute("aria-pressed", String(candidate === button));
    });
    renderTable(button.dataset.filter);
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxMeta = document.getElementById("lightbox-meta");
let activeResultIndex = 0;

function updateLightbox(index) {
  activeResultIndex = (index + results.length) % results.length;
  const item = results[activeResultIndex];
  lightboxImage.src = imagePath(item);
  lightboxImage.alt = `Colorized result for ${item.name}`;
  lightboxTitle.textContent = item.name;
  lightboxMeta.textContent = `G→B ${offsetText(item.g)}  /  R→B ${offsetText(item.r)}  /  ${item.runtime.toFixed(4)} s`;
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-result-index]");
  if (!trigger) return;
  updateLightbox(Number(trigger.dataset.resultIndex));
  lightbox.showModal();
});

document.querySelector(".lightbox-prev").addEventListener("click", () => {
  updateLightbox(activeResultIndex - 1);
});

document.querySelector(".lightbox-next").addEventListener("click", () => {
  updateLightbox(activeResultIndex + 1);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") updateLightbox(activeResultIndex - 1);
  if (event.key === "ArrowRight") updateLightbox(activeResultIndex + 1);
});
