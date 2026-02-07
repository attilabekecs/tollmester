export const LS_KEY = 'writer-helper-v3';

export function nowTs(){ return Date.now(); }
export function uid(){ return Math.random().toString(36).slice(2,10); }
export function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

export function getState(){
  let s = localStorage.getItem(LS_KEY);
  if(!s){
    const init = {
      created: nowTs(),
      updated: nowTs(),
      characters: [],
      locations: [],
      powers: [],
      events: [],
      notes: [],
      chapters: []
    };
    localStorage.setItem(LS_KEY, JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(s); } catch(e){
    const init = {
      created: nowTs(),
      updated: nowTs(),
      characters: [],
      locations: [],
      powers: [],
      events: [],
      notes: [],
      chapters: []
    };
    localStorage.setItem(LS_KEY, JSON.stringify(init));
    return init;
  }
}

export function setState(next){
  next.updated = nowTs();
  localStorage.setItem(LS_KEY, JSON.stringify(next));
}
