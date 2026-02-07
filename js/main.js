import { loadCloudState, setState } from "./state/storage.js?v=3";
import { initHeader } from "./ui/header.js";
import { initDialogs } from "./ui/dialogs.js";
import { initCharacters } from "./features/characters.js?v=2";
import { initChaptersCore } from "./chapters/chapters.core.js?v=2";
import { initChapterNotes } from "./chapters/chapters.notes.js?v=2";
import { seedIfEmpty } from "./state/seed.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadCloudState();   // ⭐ FELHŐ LETÖLTÉS INDULÁSKOR

  seedIfEmpty(); 
  initHeader();
  initDialogs();
  initCharacters();
  initChaptersCore();
  initChapterNotes();
});

// ⭐ TEMP IMPORT TOOL
window.importOldTollmester = async function(oldData){

  const fixDriveLink = url => {
    if(!url) return "";
    const m = url.match(/\/d\/(.*?)\//);
    return m ? `https://drive.google.com/uc?export=view&id=${m[1]}` : url;
  };

  const nameToId = {};
  oldData.characters.forEach(c => nameToId[c.name] = c.id);

  const characters = oldData.characters.map(c => ({
    ...c,
    links: (c.links || []).map(name => nameToId[name] || name),
    image: fixDriveLink(c.image),
    created: c.created || Date.now(),
    updated: Date.now()
  }));

  const chapters = (oldData.chapters || []).map(ch => ({
    id: ch.id,
    title: ch.title,
    html: ch.content,
    created: ch.created || Date.now(),
    updated: Date.now()
  }));

  const NEW_STATE = {
    created: Date.now(),
    updated: Date.now(),
    characters,
    locations: oldData.locations || [],
    powers: oldData.powers || [],
    events: oldData.events || [],
    notes: [],
    chapters
  };

  await setState(NEW_STATE);
  alert("Import kész! Frissítsd az oldalt.");
};

// ⭐ FILE IMPORT TOOL
window.importFile = async function(file){

  const text = await file.text();
  const oldData = JSON.parse(text);

  await importOldTollmester(oldData);
};

