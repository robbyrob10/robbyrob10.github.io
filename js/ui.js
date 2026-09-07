export function $(sel, root = document) { return root.querySelector(sel); }
export function toast(msg) {
  let host = document.getElementById("toasts");
  if (!host) { host = document.createElement("div"); host.id = "toasts"; host.className = "toast-host"; document.body.appendChild(host); }
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg; host.appendChild(el);
  setTimeout(() => el.remove(), 2400);
}
export function initials(name) { return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase(); }
export function openModal(title, body) {
  const modal = document.getElementById("modal");
  $("#doc-title", modal).textContent = title;
  $("#doc-body", modal).textContent = body;
  modal.classList.add("open");
}
