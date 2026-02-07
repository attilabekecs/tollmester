import { loadCloudState } from "./state/storage.js";
import { initHeader } from "./ui/header.js";
import { initDialogs } from "./ui/dialogs.js";
import { initCharacters } from "./features/characters.js";
import { initChaptersCore } from "./chapters/chapters.core.js";
import { initChapterNotes } from "./chapters/chapters.notes.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadCloudState();   // ⭐ FELHŐ LETÖLTÉS INDULÁSKOR

  initHeader();
  initDialogs();
  initCharacters();
  initChaptersCore();
  initChapterNotes();
});
