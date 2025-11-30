// src/textCleaner.ts

import type { CleanerOptions } from "./types";

/**
 * Nettoie le texte des caractères "indésirables" ajoutés par certaines IA.
 * Tu peux enrichir cette fonction avec d'autres remplacements au fil du temps.
 */
export function cleanAiText(input: string, opts:CleanerOptions): string {
    	// 1. Espaces “bizarres” -> espace normal (toujours appliqué)
					const weirdSpaces =
						/[\u00A0\u202F\u2007\u2009\u200A\u200B\u200C\u200D\u2060]/g;
					let output = input.replace(weirdSpaces, " ");

					// 2. Apostrophes
					if (opts.normalizeApostrophes) {
						const typographicApostrophes = /[’ʻʼˮ]/g;
						output = output.replace(typographicApostrophes, "'");
					}

					// 3. Guillemets
					if (opts.normalizeQuotes) {
						// Espaces autour de « » puis remplacement
						output = output
							.replace(/«\s+/g, "«")
							.replace(/\s+»/g, "»")
							.replace(/[“”«»]/g, '"')
							.replace(/[‚‘‛]/g, "'");
					}

					//4. Ecriture inclusive
					if (opts.inclusiveLanguage) {
						const inclusiveRegex = /(?<=\p{L})\.(?=\p{L})/gu;
						output = output.replace(inclusiveRegex, "·");
					}

					// 4. Normalisation finale
					return output.normalize("NFC");
}