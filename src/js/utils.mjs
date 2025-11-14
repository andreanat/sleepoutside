export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return await res.text();
}

export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (typeof callback === "function") callback(parentElement, data);
}

export async function loadHeaderFooter() {
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  if (!header || !footer) return;

  try {
    const [headerHTML, footerHTML] = await Promise.all([
      loadTemplate("/partials/header.html"),
      loadTemplate("/partials/footer.html")
    ]);

    renderWithTemplate(headerHTML, header);
    renderWithTemplate(footerHTML, footer);
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}