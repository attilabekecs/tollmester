import { getState, setState, nowTs } from "../state/storage.js?v=3";

export function initChaptersCore(){

  let root = getState();
if(!root) return;   // ⭐ VÉDELEM


  const $  = (s,p=document)=>p.querySelector(s);

  const elSelect = $('#chapterSelect');
  const elTitle  = $('#chapterTitle');
  const elEditor = $('#chapterEditor');
  const elSave   = $('#chapterSave');
  const elAdd    = $('#addChapter');

  // 🔹 UID helper (vissza kellett hozni)
  function uid(){ return Math.random().toString(36).slice(2,10); }

  // 🔹 Cloud DB betöltés
  let root = getState();

  if(!root.chapters || root.chapters.length === 0){
    root.chapters = [{
      id: uid(),
      title:"Új fejezet",
      html:"<p>Itt kezdheted a történetet…</p>",
      created: nowTs(),
      updated: nowTs()
    }];
    setState(root);
  }

  let state = {
    items: root.chapters,
    activeId: root.chapters[0]?.id
  };

  if(!state.activeId) state.activeId = state.items[0].id;

  function current(){
    return state.items.find(x=>x.id===state.activeId);
  }

 function saveToCloud(){

  // ⭐ új tömb létrehozása (fontos!)
  root.chapters = [...state.items];

  setState(root);
}


  function renderSelect(){
    if(!elSelect) return;
    elSelect.innerHTML='';
    state.items.forEach((it,i)=>{
      const opt=document.createElement('option');
      opt.value=it.id;
      opt.textContent=(i+1)+". "+it.title;
      elSelect.appendChild(opt);
    });
    elSelect.value=state.activeId;
  }

  function setActive(id){
    state.activeId=id;
    const it=current();
    elTitle.value=it.title;
    elEditor.innerHTML=it.html;
  }

  // ➕ Új fejezet
  elAdd?.addEventListener('click', ()=>{
    const it={
      id:uid(),
      title:"Új fejezet",
      html:"<p>Új fejezet…</p>",
      created: nowTs(),
      updated: nowTs()
    };

    state.items.push(it);
    state.activeId=it.id;

    saveToCloud();
    renderSelect();
    setActive(it.id);
  });

  // 💾 Mentés
  elSave?.addEventListener('click', ()=>{
    const it=current();
    it.title=elTitle.value;
    it.html=elEditor.innerHTML;
    it.updated = nowTs();

    saveToCloud();
    alert("Fejezet mentve");
  });

  elSelect?.addEventListener('change', ()=> setActive(elSelect.value));

  renderSelect();
  setActive(state.activeId);
}
