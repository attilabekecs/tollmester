import { getState, setState, nowTs } from "../state/storage.js";

export function initChapterNotes(){

  const listEl = document.getElementById('cnsList');
  const chapterSelect = document.getElementById('chapterSelect');

  if(!listEl || !chapterSelect) return;

  function uid(){ return Math.random().toString(36).slice(2,10); }

  function getNotesForChapter(cid){
    const root = getState();
    if(!root.notes) root.notes = [];
    return root.notes.filter(n => n.chapterId === cid);
  }

  function render(){
    const cid = chapterSelect.value;
    const notes = getNotesForChapter(cid);

    listEl.innerHTML='';

    notes.forEach(n=>{
      const el=document.createElement('div');
      el.className='note-item';
      el.textContent=n.text;
      listEl.appendChild(el);
    });
  }

  // opcionális: új jegyzet gyors gombbal később
  window.addChapterNote = function(text){
    const root = getState();
    if(!root.notes) root.notes = [];

    root.notes.push({
      id: "note_"+uid(),
      chapterId: chapterSelect.value,
      text,
      created: nowTs(),
      updated: nowTs()
    });

    setState(root);
    render();
  }

  chapterSelect.addEventListener('change', render);
  render();
}
