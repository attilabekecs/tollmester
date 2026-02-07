import { loadCloudState } from "./state/storage.js?v=3";
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
