**Title**

AI Typo Remover – Clean Up AI‑Generated Text

**Short description**

Clean up invisible characters, smart quotes, messy apostrophes, and inclusive‑writing markers in AI‑generated text with a single right‑click.

---

# Full description

AI Typo Remover is a lightweight browser extension that cleans up the hidden “typography noise” often added by AI tools and rich text editors.

When you select text and use the context menu action **“Remove unwanted characters”**, the extension:

- Normalizes **apostrophes** (smart quotes, curly apostrophes, exotic variants) into simple, consistent ones.
- Converts **French and typographic quotation marks** (such as « … », “smart quotes”) into standard straight quotes and fixes spacing around them.
- Normalizes **inclusive writing markers**, by turning `.` between letters into the recommended middle dot `·` (for example `heureux.ses` → `heureux·ses`, `chacun.e.s` → `chacun·e·s`), in line with common French inclusive‑writing guidelines.

The cleaned text is automatically copied to your clipboard so you can paste it directly into your editor, IDE, CMS, or chat.

# How it works

1. Select any piece of text in the page.
2. Right‑click and choose **“Change characters”**.
3. The extension normalizes typography (including inclusive‑writing dots) according to your configuration and copies the cleaned version to your clipboard.

You can fine‑tune the behavior in the popup under **“Configuration du Remover”**, enabling or disabling:

- Apostrophe normalization
- Quote normalization
- Inclusive‑writing normalization, depending on your preferences

# Key features

- Designed for **AI‑generated content** and copy‑pasted text.
- Supports **French typography and inclusive writing** (middle dot `·`) to keep forms like `auteur·rice`, `étudiant·e·s`, etc., consistent.
- Works entirely **locally in your browser** – no external servers, no data collection.
- Minimal UI with a small configuration popup and a simple context‑menu action.

# Privacy

AI Typo Remover processes selected text **locally** in your browser.

No text is sent to any remote server, and no content is stored or tracked.

# Licence

MIT licence

# Developpers

## Continous improvement

You can send us new feature request via this form : [Feature request or bug report for AI Text extension](https://wardleymaps.notion.site/2bb4341bfd46809a86e6ce9dbb1ffc75?pvs=105)

## Start

* npm install
* npm run build:all
* open your browser extension in developer mode
* add the dist folder as a new extension
* refresh it for each build

