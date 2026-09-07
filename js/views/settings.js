export function renderSettings(state, root, onReset) {
  root.innerHTML = `<div class="pane-head"><strong>Workspace</strong></div><div class="card"><div class="kicker">Northstar CRM</div><p>Lead, note, and message changes save in this browser.</p><p class="muted">${state.leads.length} merchants in pipeline</p><button class="btn ghost" id="reset">Reset demo data</button></div>`;
  root.querySelector("#reset").onclick = onReset;
}
