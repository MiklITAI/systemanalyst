const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));

const meta = {
  ru: {
    title: "Михаил Лазарев - AI/Product Engineer",
    description: "AI/Product Engineer и AI-assisted product builder: AI-first MVP, pilot-ready products, LLM workflows, Python automation, dashboards и API-интеграции."
  },
  en: {
    title: "Mikhail Lazarev - AI/Product Engineer",
    description: "AI/Product Engineer and AI-assisted product builder: AI-first MVPs, pilot-ready products, LLM workflows, Python automation, dashboards and API integrations."
  }
};

function updateMeta(lang) {
  const data = meta[lang] || meta.ru;
  document.title = data.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", data.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", data.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", data.description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", data.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", data.description);
}

function setLanguage(lang) {
  const current = lang === "en" ? "en" : "ru";
  document.documentElement.lang = current;
  document.body.classList.toggle("lang-en", current === "en");
  languageButtons.forEach((button) => {
    const active = button.dataset.language === current;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updateMeta(current);
  const url = new URL(window.location.href);
  if (current === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState({}, "", url);
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  document.documentElement.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));
languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

setLanguage(new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "ru");
