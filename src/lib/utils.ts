export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Diacritiques combinés (U+0300–U+036F), construits sans littéraux bruts.
const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
