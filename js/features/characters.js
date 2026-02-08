import { getState, setState, uid, nowTs } from "../state/storage.js?v=3";

export function initCharacters(){

  // ⭐ VÉDELEM – üres vagy régi Drive JSON ellen
  let root = getState();
  if(!root) return;

  if(!root.characters) root.characters = [];
  if(!root.locations)  root.locations  = [];
  if(!root.powers)     root.powers     = [];
  if(!root.events)     root.events     = [];
  if(!root.notes)      root.notes      = [];
  if(!root.chapters)   root.chapters   = [];

  bindCharacterUI();
  renderCharacters();
}

/* UI */
function bindCharacterUI(){
  document.getElementById('addCharacter')?.addEventListener('click', ()=>{
    const name = prompt("Szereplő neve?");
    if(!name) return;

    const st = getState();
    st.characters.push({
  id:'ch_'+uid(),
  name,
  image: "",
  bio: "",
  created:nowTs(),
  updated:nowTs()
});


    setState(st);
    renderCharacters();
  });
}

/* RENDER */
function renderCharacters(){
  const wrap = document.getElementById('characterCards');
  if(!wrap) return;

  const st = getState();
  wrap.innerHTML = '';

  st.characters.forEach(ch=>{
  const card = document.createElement('div');
  card.className='card';
  card.innerHTML = `
    <div class="avatar" style="background-image:url('${ch.image||''}')"></div>
    <div class="char-name">${ch.name}</div>
  `;

  // ⭐ EZ teszi kattinthatóvá a kártyát
  card.addEventListener('click', ()=>{
    openCharacterEditor(ch.id);
  });

  wrap.appendChild(card);
});
}
function openCharacterEditor(id){
  const st = getState();
  const ch = st.characters.find(c=>c.id===id);
  if(!ch) return;

  const name = prompt("Név:", ch.name);
  if(name===null) return;

  const image = prompt("Kép URL:", ch.image || "");
  const bio = prompt("Leírás:", ch.bio || "");

  ch.name = name;
  ch.image = image;
  ch.bio = bio;
  ch.updated = nowTs();

  setState(st);
  renderCharacters();
}
