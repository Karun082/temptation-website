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

function createActionLink(label, href, variant = "primary", newTab = false) {
  const link = document.createElement("a");
  link.className = variant === "secondary" ? "cta-secondary" : "cta";
  link.href = href;
  link.textContent = label;

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
      createActionLink(option.label, option.href, option.variant, option.newTab)
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
  });
}

primaryActions.push({
  label: "View Instagram",
  href: instagramLink,
  variant: whatsappLink ? "secondary" : "primary",
  newTab: true,
});

mountActions("footer-actions", primaryActions);

const dessertGrid = document.getElementById("dessert-grid");
menu.forEach((item) => {
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
      <p>${item.description}</p>
      <p class="dessert-price">${item.price}</p>
      <p class="dessert-availability${
        item.availability === "Unavailable" ? " is-unavailable" : ""
      }">${item.availability || "Available"}</p>
    </div>
  `;

  const buttonRow = document.createElement("div");
  if (item.availability !== "Unavailable" && whatsappLink) {
    buttonRow.append(
      createActionLink("Order on WhatsApp", whatsappLink, "primary", true)
    );
  }

  if (item.availability !== "Unavailable") {
    buttonRow.append(
      createActionLink(
        "Order on Instagram",
        instagramLink,
        whatsappLink ? "secondary" : "primary",
        true
      )
    );
  }

  copy.append(buttonRow);
  card.append(image, copy);
  dessertGrid.append(card);
});

const dropsGrid = document.getElementById("drops-grid");
newDrops.forEach((item) => {
  const card = document.createElement("article");
  card.className = `drop-card${item.comingSoon ? " is-coming" : ""}`;
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <span class="drop-tag">${item.status}</span>
  `;
  dropsGrid.append(card);
});

const videoGrid = document.getElementById("video-grid");
videos.forEach((item) => {
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

const reviewsGrid = document.getElementById("reviews-grid");
reviews.forEach((item) => {
  const card = document.createElement("article");
  card.className = "review-card";
  card.innerHTML = `
    <p>${item.text}</p>
    <div class="review-name">- ${item.name}</div>
  `;
  reviewsGrid.append(card);
});

const contactTarget = document.getElementById("contact-details");
contactDetails.forEach((item) => {
  const cardTag = item.linkType === "whatsapp" && whatsappLink ? "a" : "article";
  const card = document.createElement(cardTag);
  card.className = "detail-card";

  if (cardTag === "a") {
    card.href = whatsappLink;
    card.target = "_blank";
    card.rel = "noreferrer";
  }

  card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  `;
  contactTarget.append(card);
});



