const resumePlain = document.querySelector("#resume-plain");
const copyButtons = document.querySelectorAll("[data-copy-resume]");

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

initReveal();
