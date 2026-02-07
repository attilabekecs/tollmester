const API_URL = "https://script.google.com/macros/s/AKfycbyySleQJzYxIrcsCAjWTQVYEX-8SNSu8iyNjiXF3TBJJewB0JzhcY8u7cN4EDFkcsUO/exec";

let STATE = null;

export function nowTS(){
  return Date.now();
}

/* ===== ÜRES STATE ===== */
function getEmptyState(){
  return {
    created: Date.now(),
    updated: Date.now(),
    characters: [],
    locations: [],
    powers: [],
    events: [],
    notes: [],
    chapters: []
  };
}

/* ===== APP INDÍTÁS – FELHŐ LETÖLTÉS ===== */
export async function loadCloudState(){
  try{
    const res = await fetch(API_URL + "?t=" + Date.now());
    const text = await res.text();

    STATE = text ? JSON.parse(text) : getEmptyState();
    console.log("☁️ Cloud state betöltve");
  }catch(err){
    console.error("Cloud load error:", err);
    STATE = getEmptyState();
  }
}

/* ===== GET (MOST MÁR SZINKRON!) ===== */
export function getState(){
  return STATE;
}

/* ===== SET + AUTO FELHŐ MENTÉS ===== */
export async function setState(next){
  STATE = next;
  STATE.updated = Date.now();

  try{
    await fetch(API_URL, {
      method:"POST",
      headers:{ "Content-Type":"text/plain;charset=utf-8" },
      body: JSON.stringify(STATE)
    });
    console.log("☁️ Mentve Drive-ba");
  }catch(err){
    console.error("Cloud save error:", err);
  }
}
