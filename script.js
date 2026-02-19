const highlightData = [
  {
    kicker: "Brand Recognition",
    title: "Community Presence & Referral Momentum",
    subtitle: "WrightWay Emergency Services",
    summary:
      "Outreach moments that build referral trust and show large loss readiness in real-world settings.",
    tags: ["Networking", "Large Loss", "Relationship Building"],
    impact: [
      "Strengthened referral partner relationships",
      "Expanded brand visibility in the local market",
      "Reinforced readiness for complex commercial response"
    ],
    accent: "#ff3d2e",
    media: [
      {
        type: "image",
        src: "assets/brand-recognition.jpg",
        alt: "Golf event networking with the WrightWay team",
        caption: "Community event visibility with the WrightWay team",
        expected: "assets/brand-recognition.jpg"
      },
      {
        type: "video",
        src: "",
        alt: "Event recap video",
        caption: "Add a short event recap reel",
        expected: "assets/brand-reel.mp4"
      }
    ]
  },
  {
    kicker: "Marketing & Outreach",
    title: "Brand Voice That Drives Attention",
    subtitle: "LinkedIn + Industry Conversations",
    summary:
      "Consistent marketing content and public-facing outreach to build credibility and attract commercial opportunities.",
    tags: ["Social Strategy", "Recruiting", "Industry Insight"],
    impact: [
      "Boosted awareness through consistent content",
      "Supported recruiting and credibility",
      "Positioned leadership voice in the industry"
    ],
    accent: "#1b7fff",
    media: [
      {
        type: "video",
        src: "",
        alt: "Podcast guest clip",
        caption: "Drop in a podcast or interview clip",
        expected: "assets/podcast-clip.mp4"
      },
      {
        type: "image",
        src: "",
        alt: "LinkedIn highlight",
        caption: "Add a LinkedIn highlight screenshot",
        expected: "assets/linkedin-highlight.jpg"
      }
    ]
  }
];

const highlightGrid = document.querySelector("#highlight-grid");
const modal = document.querySelector("#highlight-modal");
const modalTitle = document.querySelector("#modal-title");
const modalSubtitle = document.querySelector("#modal-subtitle");
const modalSummary = document.querySelector("#modal-summary");
const modalKicker = document.querySelector("#modal-kicker");
const modalTags = document.querySelector("#modal-tags");
const modalImpact = document.querySelector("#modal-impact");
const modalMedia = document.querySelector("#modal-media");
const modalClose = document.querySelector("#modal-close");

const resumePlain = document.querySelector("#resume-plain");
const copyButtons = document.querySelectorAll("[data-copy-resume]");

const createMissingCard = (message) => {
  const figure = document.createElement("figure");
  figure.className = "media-card media-missing";
  figure.innerHTML = `<span>${message}</span>`;
  return figure;
};

const createMediaCard = (item) => {
  if (!item || !item.type) {
    return createMissingCard("Add media");
  }

  if (!item.src) {
    return createMissingCard(`Add ${item.type}: ${item.expected || "asset"}`);
  }

  const figure = document.createElement("figure");
  figure.className = "media-card";

  if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.setAttribute("playsinline", "");
    video.onerror = () => {
      figure.replaceWith(createMissingCard(`Add video: ${item.expected || item.src}`));
    };
    figure.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "Highlight media";
    img.onerror = () => {
      figure.replaceWith(createMissingCard(`Add image: ${item.expected || item.src}`));
    };
    figure.appendChild(img);
  }

  if (item.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;
    figure.appendChild(caption);
  }

  return figure;
};

const renderHighlights = () => {
  if (!highlightGrid) return;
  highlightGrid.innerHTML = "";

  highlightData.forEach((highlight, index) => {
    const card = document.createElement("article");
    card.className = "card highlight-card reveal";
    card.style.setProperty("--delay", `${index * 0.1}s`);
    card.style.setProperty("--card-accent", highlight.accent || "var(--accent)");

    const thumb = document.createElement("div");
    thumb.className = "highlight-thumb";
    const thumbMedia = highlight.media.find((item) => item.type === "image" && item.src);
    const thumbImg = document.createElement("img");
    thumbImg.src = thumbMedia?.src || "assets/placeholder.svg";
    thumbImg.alt = thumbMedia?.alt || highlight.title;
    thumbImg.onerror = () => {
      thumbImg.src = "assets/placeholder.svg";
    };
    thumb.appendChild(thumbImg);

    const kicker = document.createElement("p");
    kicker.className = "eyebrow";
    kicker.textContent = highlight.kicker;

    const title = document.createElement("h3");
    title.textContent = highlight.title;

    const summary = document.createElement("p");
    summary.className = "project-meta";
    summary.textContent = highlight.summary;

    const meta = document.createElement("div");
    meta.className = "highlight-meta";
    highlight.tags.forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = tag;
      meta.appendChild(chip);
    });

    const button = document.createElement("button");
    button.className = "btn ghost";
    button.type = "button";
    button.textContent = "Open Pop-Out";
    button.addEventListener("click", () => openHighlight(highlight));

    card.append(kicker, title, summary, thumb, meta, button);
    highlightGrid.appendChild(card);
  });
};

const openHighlight = (highlight) => {
  if (!modal || !highlight) return;

  modalKicker.textContent = highlight.kicker;
  modalTitle.textContent = highlight.title;
  modalSubtitle.textContent = highlight.subtitle;
  modalSummary.textContent = highlight.summary;

  modalTags.innerHTML = "";
  highlight.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tag;
    modalTags.appendChild(chip);
  });

  modalImpact.innerHTML = "";
  highlight.impact.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalImpact.appendChild(li);
  });

  modalMedia.innerHTML = "";
  highlight.media.forEach((item) => {
    modalMedia.appendChild(createMediaCard(item));
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const copyResume = async (button) => {
  if (!resumePlain) return;
  const text = resumePlain.textContent.trim();

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    if (button) {
      const original = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    }
  } catch (error) {
    if (button) {
      const original = button.textContent;
      button.textContent = "Copy failed";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    }
  }
};

copyButtons.forEach((button) => {
  button.addEventListener("click", () => copyResume(button));
});

const initReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((item) => observer.observe(item));
};

renderHighlights();
initReveal();
