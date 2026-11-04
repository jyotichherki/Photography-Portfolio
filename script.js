
const photos = document.querySelectorAll(".photo");
const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visiblePhotos = [];
let currentIndex = 0;

// Category filtering
function filterPhotos(category) {
  photos.forEach(photo => {
    const match =
      category === "all" ||
      photo.dataset.category === category;

    photo.style.display = match ? "block" : "none";
  });

  visiblePhotos = [...photos].filter(
    photo => photo.style.display !== "none"
  );
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filters .active")
      ?.classList.remove("active");

    button.classList.add("active");

    filterPhotos(button.dataset.category);
  });
});

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  showImage();

  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Show selected image
function showImage() {
  const selected = visiblePhotos[currentIndex];

  if (!selected) return;

  const img = selected.querySelector("img");
  const title = selected.querySelector("h3");

  lightboxImg.src = img.src;
  lightboxCaption.textContent = title.textContent;
}

// Gallery image click
photos.forEach(photo => {
  photo.addEventListener("click", () => {
    visiblePhotos = [...photos].filter(
      item => item.style.display !== "none"
    );

    const index = visiblePhotos.indexOf(photo);
    openLightbox(index);
  });
});

// Next image
nextBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex + 1) % visiblePhotos.length;

  showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + visiblePhotos.length)
    % visiblePhotos.length;

  showImage();
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside image
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard controls
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextBtn.click();
  }

  if (event.key === "ArrowLeft") {
    prevBtn.click();
  }
});

// Initial gallery
filterPhotos("all");
