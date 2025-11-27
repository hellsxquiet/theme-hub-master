# Custom Names for Chrome Internal Pages

## What It Does
- The side panel shows friendly names for `chrome://...` pages only.
- Regular websites remain unchanged and use the tab title or domain.

## Where to Edit
- File: `src/sidebar/hooks/useWebsite.ts`
- Mapping constant: 3:11:d:\.HACKING\extension\theme-hub-master\src\sidebar\hooks\useWebsite.ts

## How to Add a New Internal Page Name
1. Open `src/sidebar/hooks/useWebsite.ts`.
2. In `CHROME_INTERNAL_NAME_MAP`, add an entry where the key is the part after `chrome://` and the value is the label you want.
   - Example: to label `chrome://extensions` as `Extensions`, add:
     ```ts
     'extensions': 'Extensions'
     ```
3. Build and reload the extension:
   - Run `pnpm build`.
   - In `chrome://extensions`, click `Reload` for Theme Hub.

## Keys Explained
- Use the hostname portion of the internal URL:
  - `chrome://settings` → key: `settings`
  - `chrome://flags` → key: `flags`
  - `chrome://downloads` → key: `downloads`

## Behavior for Regular Websites
- For non-`chrome://` pages, the name remains the tab title (fallback to the domain). No configuration required.

## Troubleshooting
- If the name doesn’t update:
  - Confirm the key matches the URL exactly (e.g., `extensions`, not `chrome://extensions`).
  - Reload the extension after building.
  - Ensure the side panel has the `tabs` permission in the manifest.

