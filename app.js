const {
  business,
  menu,
  newDrops,
  videos,
  reviews,
  contactDetails,
} = siteData;

const instagramLabel = `View Instagram`;
const instagramLink = business.instagramUrl;
const whatsappLink = business.whatsappNumber
  ? `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`
  : "";

const heroText = document.querySelector(".hero-text");
if (heroText && business.taglines?.length) {
  heroText.textContent = `${business.taglines[1]}. ${business.taglines[2]} Just fresh, indulgent desserts crafted for pickup and enjoyed at their best.`;
}

document.querySelectorAll(".brand").forEach((brand) => {
  brand.href = "index.html";
  brand.removeAttribute("target");
  brand.removeAttribute("rel");
  brand.setAttribute("aria-label", "Temptation home");
});

document.querySelectorAll(".header-dropdown").forEach((dropdown) => {
  dropdown.querySelectorAll(".dropdown-action, .dropdown-divider").forEach((item) => item.remove());

  if (!dropdown.previousElementSibling?.classList.contains("header-order-actions")) {
    const actions = document.createElement("div");
    actions.className = "header-order-actions";
    actions.innerHTML = `
      <a class="header-order-whatsapp" href="${whatsappLink}" target="_blank" rel="noreferrer">Order on WhatsApp</a>
      <a class="header-order-instagram" href="${instagramLink}" target="_blank" rel="noreferrer">Order on Instagram</a>
    `;
    dropdown.before(actions);
  }

  const summary = dropdown.querySelector("summary");
  if (summary) {
    summary.setAttribute("aria-label", "Open menu");
    summary.innerHTML = '<span class="hamburger-icon" aria-hidden="true"></span>';
  }
});

function getSocialIcon(type) {
  if (type === "whatsapp") {
    return '<span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5 5 15.9A8.4 8.4 0 1 1 20.5 11.6Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M8.5 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.8c.1.3.1.5-.1.7l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.2-.2.4-.2.7-.1l1.8.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-.9.4-1.4.3-3.7-.8-6.6-3.7-7.4-7.4-.1-.5.1-1 .3-1.4Z" fill="currentColor"/></svg></span>';
  }

  if (type === "instagram") {
    return '<span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.8" r="1.1" fill="currentColor"/></svg></span>';
  }

  return "";
}

function createActionLink(label, href, variant = "primary", newTab = false, iconType = "") {
  const link = document.createElement("a");
  link.className = `${variant === "secondary" ? "cta-secondary" : "cta"}${iconType ? " has-icon" : ""}`;
  link.href = href;
  link.textContent = label;

  if (iconType) {
    link.insertAdjacentHTML("afterbegin", getSocialIcon(iconType));
  }

  if (newTab) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  return link;
}

function mountActions(targetId, options) {
  const container = document.getElementById(targetId);
  options.forEach((option) => {
    container.append(
      createActionLink(option.label, option.href, option.variant, option.newTab, option.iconType)
    );
  });
}

const primaryActions = [];

if (whatsappLink) {
  primaryActions.push({
    label: "Order on WhatsApp",
    href: whatsappLink,
    variant: "primary",
    newTab: true,
    iconType: "whatsapp",
  });
}

primaryActions.push({
  label: "View Instagram",
  href: instagramLink,
  variant: whatsappLink ? "secondary" : "primary",
  newTab: true,
  iconType: "instagram",
});

if (document.getElementById("footer-actions")) {
  mountActions("footer-actions", primaryActions);
}

document.querySelectorAll(".story-actions").forEach((container) => {
  if (!container.children.length) {
    primaryActions.forEach((option) => {
      container.append(
        createActionLink(option.label, option.href, option.variant, option.newTab, option.iconType)
      );
    });
  }
});

const storyPhotos = [...document.querySelectorAll(".story-image-cluster .story-photo img")];
if (storyPhotos.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const rotatingDesserts = storyPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }));

  setInterval(() => {
    rotatingDesserts.push(rotatingDesserts.shift());
    storyPhotos.forEach((photo, index) => {
      photo.classList.add("is-changing");
      window.setTimeout(() => {
        photo.src = rotatingDesserts[index].src;
        photo.alt = rotatingDesserts[index].alt;
        photo.classList.remove("is-changing");
      }, 220);
    });
  }, 3600);
}

const dessertGrid = document.getElementById("dessert-grid");
if (dessertGrid) {
  const menuFilters = document.querySelectorAll(".menu-filter");

  function renderMenu(category = "all") {
    const visibleItems = category === "all"
      ? menu
      : menu.filter((item) => item.category === category);

    dessertGrid.innerHTML = "";
    visibleItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "dessert-card";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt;

      const copy = document.createElement("div");
      copy.className = "dessert-copy";
      copy.innerHTML = `
        <div>
          <p class="dessert-meta">${item.size}</p>
          <h3>${item.name}</h3>
        </div>
      `;

      const buttonRow = document.createElement("div");
      buttonRow.className = "dessert-order-actions";
      buttonRow.innerHTML = '<p class="dessert-order-title">Order now on</p>';

      if (whatsappLink) {
        buttonRow.append(
          createActionLink("Order on WhatsApp", whatsappLink, "primary", true, "whatsapp")
        );
      }

      buttonRow.append(
        createActionLink(
          "Order on Instagram",
          instagramLink,
          whatsappLink ? "secondary" : "primary",
          true,
          "instagram"
        )
      );

      card.append(image, copy);
      if (buttonRow.querySelector("a")) {
        card.append(buttonRow);
      }
      dessertGrid.append(card);
    });
  }

  menuFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.category;
      menuFilters.forEach((button) => {
        const isActive = button === filter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      renderMenu(category);
    });
  });

  renderMenu();
}

const dropsGrid = document.getElementById("drops-grid");
if (dropsGrid) newDrops.forEach((item) => {
  const card = document.createElement("article");
  card.className = `drop-card${item.comingSoon ? " is-coming" : ""}${item === newDrops[0] ? " is-featured" : ""}`;
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="drop-card-copy">
      <span class="drop-orbit" aria-hidden="true"></span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span class="drop-tag">${item.status}</span>
    </div>
  `;
  dropsGrid.append(card);
});

const videoGrid = document.getElementById("video-grid");
if (videoGrid) {
  // Duplicate the short reel set so the carousel can loop without a visible end.
  [...videos, ...videos].forEach((item) => {
  const card = document.createElement("article");
  card.className = "video-card";

  const video = document.createElement("video");
  video.src = item.src;
  video.poster = item.poster;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = true;
  video.preload = "metadata";

  card.append(video);
  videoGrid.append(card);
  });

  let carouselFrame;
  let isCarouselPaused = false;

  function moveVideoCarousel() {
    if (!isCarouselPaused) {
      videoGrid.scrollLeft += 0.35;

      if (videoGrid.scrollLeft >= videoGrid.scrollWidth / 2) {
        videoGrid.scrollLeft -= videoGrid.scrollWidth / 2;
      }
    }

    carouselFrame = requestAnimationFrame(moveVideoCarousel);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    carouselFrame = requestAnimationFrame(moveVideoCarousel);
  }

  ["mouseenter", "touchstart", "focusin"].forEach((eventName) => {
    videoGrid.addEventListener(eventName, () => {
      isCarouselPaused = true;
    });
  });

  ["mouseleave", "touchend", "focusout"].forEach((eventName) => {
    videoGrid.addEventListener(eventName, () => {
      isCarouselPaused = false;
    });
  });
}

const reviewsGrid = document.getElementById("reviews-grid");
if (reviewsGrid) {
  [...reviews, ...reviews].forEach((item) => {
  const card = document.createElement("article");
  card.className = "review-card";
  card.innerHTML = `
    <p>${item.text}</p>
    <div class="review-name">- ${item.name}</div>
  `;
  reviewsGrid.append(card);
  });

  let reviewIndex = 0;
  let reviewsPaused = false;

  function moveToNextReview() {
    if (reviewsPaused) return;

    const firstReview = reviewsGrid.querySelector(".review-card");
    if (!firstReview) return;

    reviewIndex += 1;
    if (reviewIndex >= reviews.length) {
      reviewsGrid.scrollTo({ left: 0, behavior: "auto" });
      reviewIndex = 0;
      return;
    }

    reviewsGrid.scrollTo({
      left: reviewIndex * (firstReview.offsetWidth + 24),
      behavior: "smooth",
    });
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(moveToNextReview, 4800);
  }

  ["mouseenter", "touchstart", "focusin"].forEach((eventName) => {
    reviewsGrid.addEventListener(eventName, () => {
      reviewsPaused = true;
    });
  });

  ["mouseleave", "touchend", "focusout"].forEach((eventName) => {
    reviewsGrid.addEventListener(eventName, () => {
      reviewsPaused = false;
    });
  });
}

const contactTarget = document.getElementById("contact-details");
if (contactTarget) contactDetails.forEach((item) => {
  const isWhatsapp = item.linkType === "whatsapp" && whatsappLink;
  const isInstagram = item.linkType === "instagram";
  const card = document.createElement(isWhatsapp || isInstagram ? "a" : "article");
  card.className = `detail-card${isWhatsapp ? " is-whatsapp" : ""}${isInstagram ? " is-instagram" : ""}`;

  if (isWhatsapp || isInstagram) {
    card.href = isWhatsapp ? whatsappLink : instagramLink;
    card.target = "_blank";
    card.rel = "noreferrer";
  }

  card.innerHTML = `
    ${getSocialIcon(isWhatsapp ? "whatsapp" : isInstagram ? "instagram" : "")}
    <div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
  `;
  contactTarget.append(card);
});



