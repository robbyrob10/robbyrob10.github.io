import { currentLead } from "./lead.js";
export function renderMessages(state, root, onSend) {
  const l = currentLead(state);
  const threads = state.messages[l?.id] || [];
  root.innerHTML = `<div class="pane-head"><strong>Messages</strong><span class="muted">${threads.length} threads</span></div><div class="threads">${threads.map((t) => `<div class="thread"><b>${t.from}</b><div class="muted">${t.meta}</div><p>${t.body}</p></div>`).join("") || "<p class='muted' style='padding:14px'>No messages for this merchant.</p>"}</div><div class="composer"><input id="msg-in" placeholder="Write a concise follow-up"><button class="btn" id="msg-send">Send</button></div><div class="dialer"><span>${l ? l.contact : ""} · demo dialer</span><span class="muted">${l?.phones?.[0] || ""}</span><button class="btn" id="dial">Call</button></div>`;
  root.querySelector("#msg-send").onclick = () => { const v = root.querySelector("#msg-in").value.trim(); if (v) onSend({ type: "message", text: v }); };
  root.querySelector("#dial").onclick = () => onSend({ type: "dial" });
}
