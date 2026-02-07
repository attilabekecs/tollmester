export function initChapterNotes(){
  const STORAGE_KEY = 'chapterNotesById';
  const listEl = document.getElementById('cnsList');
  const chapterSelect = document.getElementById('chapterSelect');

  if(!listEl || !chapterSelect) return;

  function load(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }
  function save(data){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function render(){
    const all = load();
    const cid = chapterSelect.value;
    const notes = all[cid] || [];
    listEl.innerHTML='';

    notes.forEach(n=>{
      const el=document.createElement('div');
      el.className='note-item';
      el.textContent=n.text;
      listEl.appendChild(el);
    });
  }

  chapterSelect.addEventListener('change', render);
  render();
}
