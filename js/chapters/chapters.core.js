export function initChaptersCore(){

  const $  = (s,p=document)=>p.querySelector(s);
  const $$ = (s,p=document)=>Array.from(p.querySelectorAll(s));

  const elSelect = $('#chapterSelect');
  const elTitle  = $('#chapterTitle');
  const elEditor = $('#chapterEditor');
  const elSave   = $('#chapterSave');
  const elAdd    = $('#addChapter');

  const LS_KEY = 'tollmester.chapters.v2';

  function uid(){ return Math.random().toString(36).slice(2,10); }

  function load(){
    try { return JSON.parse(localStorage.getItem(LS_KEY)); }
    catch { return null; }
  }

  function save(state){
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  let state = load() || {
    items:[{
      id:uid(),
      title:"Új fejezet",
      html:"<p>Itt kezdheted a történetet…</p>"
    }],
    activeId:null
  };

  if(!state.activeId) state.activeId = state.items[0].id;

  function current(){
    return state.items.find(x=>x.id===state.activeId);
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

  elAdd?.addEventListener('click', ()=>{
    const it={
      id:uid(),
      title:"Új fejezet",
      html:"<p>Új fejezet…</p>"
    };
    state.items.push(it);
    state.activeId=it.id;
    save(state);
    renderSelect();
    setActive(it.id);
  });

  elSave?.addEventListener('click', ()=>{
    const it=current();
    it.title=elTitle.value;
    it.html=elEditor.innerHTML;
    save(state);
    alert("Fejezet mentve");
  });

  elSelect?.addEventListener('change', ()=> setActive(elSelect.value));

  renderSelect();
  setActive(state.activeId);
}
