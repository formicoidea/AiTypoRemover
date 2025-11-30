// src/background.ts
import { cleanAiText } from "./textCleaner";
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

				const selection = window.getSelection();
				const rawText = selection ? selection.toString() : "";
				const cleaned = cleanAiText(rawText, opts);

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
