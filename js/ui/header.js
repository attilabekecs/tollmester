import { getState, setState } from "../state/storage.js";

export function initHeader(){
  const themeBtn = document.getElementById('themeToggle');
  const exportBtn = document.getElementById('exportBtn');
  const importInput = document.getElementById('importInput');
  const resetBtn = document.getElementById('resetBtn');

  themeBtn?.addEventListener('click', ()=>{
    const cur = document.body.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('tm-theme', next);
  });

  const savedTheme = localStorage.getItem('tm-theme');
  if(savedTheme) document.body.setAttribute('data-theme', savedTheme);

  exportBtn?.addEventListener('click', ()=>{
    const data = JSON.stringify(getState(), null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tollmester-export.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  importInput?.addEventListener('change', (e)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const obj = JSON.parse(reader.result);
      setState(obj);
      location.reload();
    };
    reader.readAsText(f);
  });

  resetBtn?.addEventListener('click', ()=>{
    if(confirm('Biztosan törlöd az összes adatot?')){
      localStorage.clear();
      location.reload();
    }
  });
}
