export function initDialogs(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('dialog[open]').forEach(d=>d.close());
    }
  });
}
