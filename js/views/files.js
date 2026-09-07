import { currentLead } from "./lead.js";
import { openModal } from "../ui.js";
export function renderFiles(state, root) {
  const l = currentLead(state);
  const files = state.files[l?.id] || [];
  root.innerHTML = `<div class="pane-head"><strong>Documents</strong><span class="muted">${l ? l.name : ""}</span></div><div class="card">${files.map((f) => `<button class="file" data-file="${f.id}"><b>${f.title}</b><div class="muted">${f.pages} pages</div></button>`).join("") || "<p class='muted'>No files yet.</p>"}</div>`;
  root.querySelectorAll("[data-file]").forEach((btn) => {
    btn.onclick = () => { const f = files.find((x) => x.id === btn.dataset.file); if (f) openModal(f.title, f.body); };
  });
}
