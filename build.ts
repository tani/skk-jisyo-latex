const src = await Deno.readTextFile("./unicode_latex_unicodemath.json");
const dat = JSON.parse(src) as string[][];
let dic = `;; LaTeX Symbol Dictionary
;; Copyright: (c) 2021 TANIGUCHI Masaya
;;
;; Original: http://milde.users.sourceforge.net/LUCR/Math/unimathsymbols.html
;; Copyright: (c) 2011 G\"unter Milde
;; Date: Last revised 2011-11-08
;; License: This work may be distributed and/or modified under the condition of
;;          LaTeX Project Public License, eiter version 1.3 of this license or
;;          (at your option) any later version.
;; okuri-ari entries.
;; okuri-nasi entries.
`;
for (const [_, character, latex, unicodeMath] of dat) {
  if (!latex || !unicodeMath) continue;
  if (latex.match(/[^a-zA-Z\\]/) || unicodeMath.match(/[^a-zA-Z\\]/)) continue;
  if (latex[0] !== "\\" || unicodeMath[0] !== "\\") continue;

  dic += `${latex.slice(1)} /${character}/` + "\n";
  if (latex !== unicodeMath) {
    dic += `${unicodeMath.slice(1)} /${character}/` + "\n";
  }
}
await Deno.writeTextFile("./SKK-JISYO.latex.utf8", dic);
