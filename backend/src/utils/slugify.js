/**
 * Convertit une chaîne en slug URL-friendly.
 * Ex : "Mon Super Projet !" => "mon-super-projet"
 */
module.exports = function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};
