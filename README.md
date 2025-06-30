# 🧠 Mindful Defaults – Chrome Extension

**Mindful Defaults** is a lightweight Chrome extension that helps you become more intentional with your online habits. It gently nudges you to reflect before diving into sites like YouTube — helping you reclaim your time and attention.

---

## ✨ Features

- 🧘 Initial **mindfulness prompt** when visiting a distracting site
- ⏱️ Customizable **reminder timer** (e.g., every 10 minutes)
- 🔁 Smart **overlays** that remind you to take breaks
- 🌐 **Redirect to a calming or productive site** when clicking “Never Mind”
- ⚙️ A simple **settings page** to configure:
  - Break redirect URL
  - Timer duration
- 📝 **Tooltips** on all buttons for better clarity

---

## 📦 Installation

1. Clone or download this repository.
2. Open Chrome and visit: `chrome://extensions`
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.
5. Open YouTube (or another target site) to see it in action.
6. Use the **Settings** button on the overlay to customize behavior.

---

## 🗂 Project Structure

```plaintext
📁 mindful-defaults-extension/
├── manifest.json           # Extension metadata & permissions
├── background.js           # Background timer + message handler
├── content.js              # Injected script to show overlays
├── options.html            # Settings UI for redirect URL + timer
└── (optional) icons/, styles.css, etc.
```
