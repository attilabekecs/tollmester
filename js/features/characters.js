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
      <div class="avatar"></div>
      <div class="char-name">${ch.name}</div>
    `;
    wrap.appendChild(card);
  });
}
