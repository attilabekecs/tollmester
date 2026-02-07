import { getState, setState, uid, nowTs } from "./storage.js?v=3";

export function seedIfEmpty(){
  const st = getState();

  // ⭐ VÉDELEM – ha a Drive JSON üres vagy régi
  if(!st.characters) st.characters = [];
  if(!st.locations)  st.locations  = [];
  if(!st.powers)     st.powers     = [];
  if(!st.events)     st.events     = [];
  if(!st.notes)      st.notes      = [];
  if(!st.chapters)   st.chapters   = [];

  if(st.characters.length === 0){
    st.characters.push(
      { id:'ch_'+uid(), name:'Albert', gender:'Férfi', created:nowTs(), updated:nowTs() },
      { id:'ch_'+uid(), name:'Ashlynn', gender:'Nő', created:nowTs(), updated:nowTs() }
    );
    setState(st);
  }
}
