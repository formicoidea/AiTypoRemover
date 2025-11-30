// scripts/copy-assets.mjs
import fs from "fs";
import path from "path";

const root = process.cwd();
const distDir = path.join(root, "dist");

// s'assure que dist existe
if (!fs.existsSync(distDir)) {
	fs.mkdirSync(distDir, { recursive: true });
}

// petite fonction utilitaire de copie
function copy(src, dest) {
	const srcPath = path.join(root, src);
	const destPath = path.join(distDir, dest);

	// crée les dossiers parents si besoin
	fs.mkdirSync(path.dirname(destPath), { recursive: true });

	fs.copyFileSync(srcPath, destPath);
}

// copie les fichiers principaux
copy("manifest.json", "manifest.json");
copy("popup.html", "popup.html");

// copie récursive du dossier icons
const srcIconsDir = path.join(root, "icons");
const destIconsDir = path.join(distDir, "icons");

function copyDir(srcDir, destDir) {
	if (!fs.existsSync(srcDir)) return;
	fs.mkdirSync(destDir, { recursive: true });
	for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
		const srcEntry = path.join(srcDir, entry.name);
		const destEntry = path.join(destDir, entry.name);
		if (entry.isDirectory()) {
			copyDir(srcEntry, destEntry);
		} else {
			fs.copyFileSync(srcEntry, destEntry);
		}
	}
}

copyDir(srcIconsDir, destIconsDir);

console.log("Assets copiés dans dist/");