import { initHeader } from "./ui/header.js";
import { initDialogs } from "./ui/dialogs.js";
import { initCharacters } from "./features/characters.js";
import { seedIfEmpty } from "./state/seed.js";
import { initChaptersCore } from "./chapters/chapters.core.js";
import { initChapterNotes } from "./chapters/chapters.notes.js";

document.addEventListener("DOMContentLoaded", () => {
  seedIfEmpty();
  initHeader();
  initDialogs();
  initCharacters();
  initChaptersCore();
  initChapterNotes();
});
