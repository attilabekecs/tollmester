const API_URL = "https://script.google.com/macros/s/AKfycbyySleQJzYxIrcsCAjWTQVYEX-8SNSu8iyNjiXF3TBJJewB0JzhcY8u7cN4EDFkcsUO/exec";

/* ===============================
   STATE BETÖLTÉS (Google Drive)
   =============================== */
export async function getState(){
  try{
    const res = await fetch(API_URL + "?t=" + Date.now()); // cache kerülés
    const text = await res.text();

    // ha még üres a fájl
    if(!text || text.trim() === ""){
      return getEmptyState();
    }

    return JSON.parse(text);
  }catch(err){
    console.error("Cloud load error:", err);
    alert("Nem sikerült betölteni a felhő adatokat.");
    return getEmptyState();
  }
}

/* ===============================
   STATE MENTÉS (Google Drive)
   =============================== */
export async function setState(data){
  try{
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data),
    });
  }catch(err){
    console.error("Cloud save error:", err);
    alert("Nem sikerült menteni a felhőbe.");
  }
}

/* ===============================
   ÜRES STATE fallback
   =============================== */
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
