import { money } from "../data.js";
import { $ } from "../ui.js";
export function renderPipeline(state, root, onSelect) {
  const q = (state.query || "").toLowerCase();
  const leads = state.leads.filter((l) => (l.name + l.contact + l.city + l.status).toLowerCase().includes(q));
  root.innerHTML = `<div class="pane-head"><strong>Pipeline</strong><span class="muted">${leads.length} leads</span></div><div style="padding:12px 14px"><input id="lead-search" placeholder="Search merchants" value="${state.query || ""}"></div><div id="lead-rows"></div>`;
  const rows = $("#lead-rows", root);
  rows.innerHTML = leads.map((l) => `<button class="lead ${l.id === state.selectedId ? "active" : ""}" data-id="${l.id}"><span class="pill">${l.status}</span><span class="name">${l.name}</span><div class="muted">${l.contact} · ${l.city}</div><div class="money">Ask ${money(l.ask)}</div></button>`).join("");
  $("#lead-search", root).oninput = (e) => onSelect({ type: "query", value: e.target.value });
  rows.onclick = (e) => { const btn = e.target.closest(".lead"); if (btn) onSelect({ type: "select", id: btn.dataset.id }); };
}
