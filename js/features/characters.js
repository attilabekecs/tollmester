import { getState, setState, uid, nowTs } from "../state/storage.js?v=3";

let openedProfileId = null;
let editedCharacterId = null;

/* INIT */
export function initCharacters(){
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

/* ================= ADD CHARACTER ================= */
function bindCharacterUI(){
  document.getElementById('addCharacter')?.addEventListener('click', ()=>{
    const name = prompt("Szereplő neve?");
    if(!name) return;

    const st = getState();
    st.characters.push({
      id:'ch_'+uid(),
      name,
      image:"",
      bio:"",
      created:nowTs(),
      updated:nowTs()
    });

    setState(st);
    renderCharacters();
  });
}

/* ================= RENDER CARDS ================= */
function renderCharacters(){
  const wrap = document.getElementById('characterCards');
  if(!wrap) return;

  const st = getState();
  wrap.innerHTML = '';

  st.characters.forEach(ch=>{
    const card = document.createElement('div');
    card.className='card';

    card.innerHTML = `
      <div class="avatar" style="background-image:url('${ch.image || ''}')"></div>
      <div class="char-name">${ch.name}</div>
    `;

    // 👉 MOSTANTÓL PROFIL NYÍLIK
    card.addEventListener('click', ()=>{
      openCharacterProfile(ch.id);
    });

    wrap.appendChild(card);
  });
}

/* ================= PROFILE DIALOG ================= */
export function openCharacterProfile(id){
  const st = getState();
  const ch = st.characters.find(c=>c.id===id);
  if(!ch) return;

  openedProfileId = id;

  document.getElementById("profileImage").src =
    ch.image || "https://placehold.co/600x900?text=No+Image";

  document.getElementById("profileName").textContent = ch.name;
  document.getElementById("profileBio").textContent  = ch.bio || "Nincs leírás.";

  document.getElementById("profileCreated").textContent =
    "Létrehozva: " + new Date(ch.created).toLocaleDateString();

  document.getElementById("profileUpdated").textContent =
    "Frissítve: " + new Date(ch.updated).toLocaleDateString();

  document.getElementById("characterProfile").showModal();
}

/* ================= PROFILE BUTTONS ================= */
document.getElementById("profileClose")?.addEventListener("click", ()=>{
  document.getElementById("characterProfile").close();
});

document.getElementById("profileEdit")?.addEventListener("click", ()=>{
  document.getElementById("characterProfile").close();
  openCharacterEditor(openedProfileId);
});

document.getElementById("profileDelete")?.addEventListener("click", ()=>{
  if(!confirm("Biztos törlöd a szereplőt?")) return;

  const st = getState();
  st.characters = st.characters.filter(c => c.id !== openedProfileId);
  setState(st);
  renderCharacters();

  document.getElementById("characterProfile").close();
});

/* ================= EDITOR DIALOG ================= */
function openCharacterEditor(id){
  const st = getState();
  const ch = st.characters.find(c=>c.id===id);
  if(!ch) return;

  editedCharacterId = id;

  document.getElementById("chName").value  = ch.name || "";
  document.getElementById("chImage").value = ch.image || "";
  document.getElementById("chBio").value   = ch.bio || "";

  document.getElementById("characterDialog").showModal();
}

document.getElementById("chSave")?.addEventListener("click", ()=>{
  const st = getState();
  const ch = st.characters.find(c=>c.id===editedCharacterId);
  if(!ch) return;

  ch.name  = document.getElementById("chName").value;
  ch.image = document.getElementById("chImage").value;
  ch.bio   = document.getElementById("chBio").value;
  ch.updated = nowTs();

  setState(st);
  renderCharacters();

  document.getElementById("characterDialog").close();
});

document.getElementById("chCancel")?.addEventListener("click", ()=>{
  document.getElementById("characterDialog").close();
});
