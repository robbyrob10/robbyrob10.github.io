import { loadState, saveState, resetState } from "./store.js";
import { toast } from "./ui.js";
import { renderPipeline } from "./views/pipeline.js";
import { renderLead, currentLead } from "./views/lead.js";
import { renderMessages } from "./views/messages.js";
import { renderFiles } from "./views/files.js";
import { renderSettings } from "./views/settings.js";
const listEl = document.getElementById("list-pane");
const mainEl = document.getElementById("main-pane");
const sideEl = document.getElementById("side-pane");
const workspace = document.getElementById("workspace");
let state = null;
async function persist() { await saveState(state); }
function render() {
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === state.view));
  if (state.view === "settings") {
    workspace.className = "workspace cols-1"; listEl.hidden = true; sideEl.hidden = true;
    renderSettings(state, mainEl, async () => {
      const fresh = await resetState();
      Object.keys(state).forEach((k) => delete state[k]); Object.assign(state, fresh);
      await persist(); render(); toast("Demo data reset");
    });
    return;
  }
  listEl.hidden = false; sideEl.hidden = state.view === "files";
  workspace.className = state.view === "files" ? "workspace cols-2" : "workspace cols-3";
  renderPipeline(state, listEl, async (ev) => {
    if (ev.type === "query") state.query = ev.value;
    if (ev.type === "select") { state.selectedId = ev.id; state.view = "leads"; }
    await persist(); render();
  });
  if (state.view === "files") renderFiles(state, mainEl);
  else renderLead(state, mainEl, handleLead);
  if (!sideEl.hidden) renderMessages(state, sideEl, handleLead);
}
async function handleLead(ev) {
  const id = state.selectedId; const lead = currentLead(state);
  if (ev.type === "status") { lead.status = ev.value; toast("Status saved"); }
  if (ev.type === "note") {
    state.notes[id] = state.notes[id] || [];
    state.notes[id].unshift({ id: "n" + Date.now(), text: ev.text, author: "You", at: "Just now", pinned: false });
    toast("Note added");
  }
  if (ev.type === "message") {
    state.messages[id] = state.messages[id] || [];
    state.messages[id].push({ id: "m" + Date.now(), from: "You -> " + lead.contact, meta: "Just now", body: ev.text });
    toast("Message queued");
  }
  if (ev.type === "dial") toast("Demo call started - " + (lead.phones[0] || ""));
  await persist(); render();
}
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.onclick = async () => { state.view = btn.dataset.view; await persist(); render(); };
});
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.id === "doc-close") e.currentTarget.classList.remove("open");
});
loadState().then((loaded) => { state = loaded; render(); });
