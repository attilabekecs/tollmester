import { initHeader } from "./ui/header.js";
import { initDialogs } from "./ui/dialogs.js";
import { initCharacters } from "./features/characters.js";
import { seedIfEmpty } from "./state/seed.js";

document.addEventListener("DOMContentLoaded", () => {
  seedIfEmpty();
  initHeader();
  initDialogs();
  initCharacters();
});
