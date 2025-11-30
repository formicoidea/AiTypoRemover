// src/background.ts
import { defaultCleanerOptions, CleanerOptions } from "./types";

const MENU_ID = "remove-unwanted-characters";

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: MENU_ID,
		title: "Change characters",
		contexts: ["selection"],
	});
});

function loadOptions(): Promise<CleanerOptions> {
	return new Promise((resolve) => {
		chrome.storage.sync.get(defaultCleanerOptions, (items) => {
			resolve(items as CleanerOptions);
		});
	});
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId !== MENU_ID) return;
	if (!tab || tab.id === undefined) return;

	try {
		const options = await loadOptions();

		const results = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: (opts: CleanerOptions) => {
				/**
				 * Nettoie le texte des caractères "indésirables" ajoutés par certaines IA.
				 * Tu peux enrichir cette fonction avec d'autres remplacements au fil du temps.
				 */
				function cleanAiText(input: string): string {
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

				const selection = window.getSelection();
				const rawText = selection ? selection.toString() : "";
				const cleaned = cleanAiText(rawText);

				if (cleaned) {
					navigator.clipboard.writeText(cleaned).catch((err) => {
						console.error("Clipboard write failed:", err);
					});
				}

				return cleaned;
			},
			args: [options],
		});

		const cleanedText =
			results && results[0] && typeof results[0].result === "string"
				? results[0].result
				: "";

		if (cleanedText) {
			console.log("Selection cleaned and copied to clipboard:", cleanedText);
		} else {
			console.log("No text selected or cleaned text is empty.");
		}
	} catch (error) {
		console.error("Error while cleaning selection via scripting:", error);
	}
});
