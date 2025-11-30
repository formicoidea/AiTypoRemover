// src/popup.ts

import { defaultCleanerOptions, CleanerOptions } from "./types";

function loadOptions(): Promise<CleanerOptions> {
	return new Promise((resolve) => {
		chrome.storage.sync.get(defaultCleanerOptions, (items) => {
			resolve(items as CleanerOptions);
		});
	});
}

function saveOptions(options: CleanerOptions) {
	chrome.storage.sync.set(options);
}

document.addEventListener("DOMContentLoaded", async () => {
	const options = await loadOptions();

	document
		.querySelectorAll<HTMLLabelElement>(".setting-row[data-key]")
		.forEach((row) => {
			const key = row.dataset.key as keyof CleanerOptions;
			const input = row.querySelector<HTMLInputElement>("input[type=checkbox]");
			if (!input || !key) return;

			// état initial depuis storage
			input.checked = options[key];

			// mise à jour + persistance
			input.addEventListener("change", () => {
				options[key] = input.checked;
				saveOptions(options);
			});
		});
});