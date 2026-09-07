import { money, STATUSES } from "../data.js";
import { initials, openModal, toast } from "../ui.js";
export function currentLead(state) {
  return state.leads.find((l) => l.id === state.selectedId) || state.leads[0];
}
export function renderLead(state, root, onAction) {
  const l = currentLead(state);
  if (!l) { root.innerHTML = "<div class='card'>No lead selected.</div>"; return; }
  const notes = state.notes[l.id] || [];
  const files = state.files[l.id] || [];
  const acts = state.activity[l.id] || [];
  root.innerHTML = `
    <div class="pane-head"><div style="display:flex;gap:10px;align-items:center"><div class="avatar">${initials(l.contact)}</div><div><strong>${l.name}</strong><div class="muted">${l.contact} - ${l.role}</div></div></div>
    <select id="status">${STATUSES.map((s) => `<option ${s===l.status?"selected":""}>${s}</option>`).join("")}</select></div>
    <div class="row"><div class="card"><div class="kicker">Contact information</div>
      ${l.phones.map((p) => `<div class="field"><span class="muted">Phone</span> ${p} <button class="btn ghost" data-call="${p}">Call</button></div>`).join("")}
      ${l.emails.map((e) => `<div class="field"><span class="muted">Email</span> ${e} <button class="btn ghost" data-mail="${e}">Compose</button></div>`).join("")}</div>
    <div class="card"><div class="kicker">Company details</div><p><b>${l.legal}</b><br>${l.industry}<br>Opened ${l.since}</p><p class="muted">${l.address}</p></div></div>
    <div class="card"><div class="kicker">Financial picture</div><div class="row">
      ${metric("Avg monthly deposits", money(l.deposits))}${metric("Requested funding", money(l.requested))}${metric("MTD deposits", money(l.mtdDeposits))}${metric("MTD balance", money(l.balance))}${metric("Avg daily inflow", money(l.inflow))}${metric("Avg daily outflow", money(l.outflow))}</div></div>
    <div class="row"><div class="card"><div class="kicker">Cash-flow pressure</div><p><b>Payroll and contractor draws</b> <span class="money">${money(l.payroll)}</span></p></div>
    <div class="card"><div class="kicker">MCA obligations</div>${l.mca.length ? l.mca.map((m) => `<p><b>${m.name}</b> ${money(m.amount)}/mo<br><span class="muted">${m.note}</span></p>`).join("") : "<p class='muted'>None on file.</p>"}</div></div>
    <div class="card"><div class="kicker">Finance-based sales pitch</div><p id="pitch">${l.contact.split(" ")[0]}, deposits are consistent, but payroll timing and existing obligations narrow the cushion.</p><button class="btn ghost" id="copy-pitch">Copy pitch</button></div>
    <div class="card"><div class="kicker">Source files</div>${files.map((f) => `<button class="file" data-file="${f.id}"><b>${f.title}</b><div class="muted">${f.pages} pages</div></button>`).join("") || "<p class='muted'>No files yet.</p>"}</div>
    <div class="card"><div class="kicker">Notes - ${notes.length}</div>${notes.map((n) => `<div class="note"><p>${n.text}</p><div class="muted">${n.author} - ${n.at}${n.pinned ? " - Pinned" : ""}</div></div>`).join("")}
    <div class="composer"><input id="note-in" placeholder="Add a concise rep note"><button class="btn" id="add-note">Add note</button></div></div>
    <div class="card"><div class="kicker">Latest activity</div>${acts.map((a) => `<div class="activity"><b>${a.title}</b><div>${a.detail}</div><div class="muted">${a.meta}</div></div>`).join("") || "<p class='muted'>No activity.</p>"}</div>`;
  root.querySelector("#status").onchange = (e) => onAction({ type: "status", value: e.target.value });
  root.querySelector("#add-note").onclick = () => { const v = root.querySelector("#note-in").value.trim(); if (v) onAction({ type: "note", text: v }); };
  root.querySelector("#copy-pitch").onclick = async () => { try { await navigator.clipboard.writeText(root.querySelector("#pitch").innerText); } catch {} toast("Pitch copied"); };
  root.querySelectorAll("[data-file]").forEach((btn) => { btn.onclick = () => { const f = files.find((x) => x.id === btn.dataset.file); if (f) openModal(f.title, f.body); }; });
  root.querySelectorAll("[data-call]").forEach((b) => b.onclick = () => toast("Dialing " + b.dataset.call));
  root.querySelectorAll("[data-mail]").forEach((b) => b.onclick = () => toast("Compose " + b.dataset.mail));
}
function metric(label, value) { return `<div class="metric"><div class="kicker">${label}</div><div class="v">${value}</div></div>`; }
