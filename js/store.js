import { SEED_LEADS, SEED_NOTES, SEED_MESSAGES, SEED_FILES } from "./data.js";
const DB_NAME = "northstar-crm";
const DB_VERSION = 1;
const STORE = "workspace";
const RECORD = "state";
function seed() {
  return {
    leads: SEED_LEADS, notes: SEED_NOTES, messages: SEED_MESSAGES, files: SEED_FILES,
    activity: { harbor: [
      { title: "Email opened", detail: "Opened working-capital option twice", meta: "12m · Maria Alvarez" },
      { title: "Note added", detail: "Asked for a clearer picture of existing MCA payments", meta: "1h · Jordan Lee" },
      { title: "Statement reviewed", detail: "February 2026 statement reviewed", meta: "Yesterday · Jordan Lee" }
    ]},
    selectedId: "harbor", view: "leads", query: ""
  };
}
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => { const db = req.result; if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function loadState() {
  try {
    const db = await openDb();
    const state = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const get = tx.objectStore(STORE).get(RECORD);
      get.onsuccess = () => resolve(get.result);
      get.onerror = () => reject(get.error);
    });
    db.close();
    return state ? { ...seed(), ...state } : seed();
  } catch { return seed(); }
}
export async function saveState(state) {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(JSON.parse(JSON.stringify(state)), RECORD);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}
export async function resetState() {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(RECORD);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  return seed();
}
