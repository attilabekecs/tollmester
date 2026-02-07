import { loadCloudState } from "./state/storage.js?v=2";
import { initHeader } from "./ui/header.js";
import { initDialogs } from "./ui/dialogs.js";
import { initCharacters } from "./features/characters.js";
import { initChaptersCore } from "./chapters/chapters.core.js";
import { initChapterNotes } from "./chapters/chapters.notes.js";
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
