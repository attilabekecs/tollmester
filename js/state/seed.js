import { getState, setState, uid, nowTs } from "./storage.js?v=3";

export function seedIfEmpty(){
  const st = getState();
  if(st.characters.length === 0){
    st.characters.push(
      { id:'ch_'+uid(), name:'Albert', gender:'Férfi', created:nowTs(), updated:nowTs() },
      { id:'ch_'+uid(), name:'Ashlynn', gender:'Nő', created:nowTs(), updated:nowTs() }
    );
    setState(st);
  }
}
