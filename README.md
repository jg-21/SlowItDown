# SlowItDown

Mindful Defaults Chrome Extension
A lightweight Chrome extension that helps users be more intentional about their browsing habits by prompting mindfulness overlays and reminders on specified websites like YouTube.

Features
Shows an initial prompt asking if you’re browsing with intention or out of habit

Sends periodic reminder nudges after a customizable timer to encourage mindful breaks

Allows users to customize their preferred break redirect page

Lets users customize the reminder timer duration

Clean overlay UI with actionable buttons: Continue, Never Mind (redirect), Settings

Settings page to save preferences (redirect URL and timer duration)

Supports multiple reminders and timer resets after user interactions

How It Works
When the user visits a target site (e.g. YouTube), the extension injects a content script that shows an initial mindfulness prompt overlay.

If the user continues, a timer starts running in the background service worker.

When the timer expires, the extension sends a message to the content script to show a reminder overlay.

The user can choose to keep watching, take a break (redirect to the saved URL), or open settings.

The extension listens for user interactions to start/stop timers and update settings accordingly.

Installation & Usage
Clone or download this repository.

Open Chrome and go to chrome://extensions.

Enable Developer mode (top right).

Click Load unpacked and select the project folder.

The extension will install and prompt you to configure settings on first install.

Visit YouTube or your target site and test the mindfulness overlays.

Project Structure
manifest.json: Extension manifest with permissions and scripts.

background.js: Background service worker that manages timers and messaging.

content.js: Content script injected into target pages to show overlays and handle user interaction.

options.html + embedded script: Settings page UI for customizing redirect URL and reminder timer.

styles.css (optional): Styles for overlays and options page (can be embedded or separate).

Customization
Update manifest.json to change which sites the content script runs on.

Default redirect URL is https://asoftmurmur.com/ but can be changed in Settings.

Default reminder timer is 10 minutes but can be customized via Settings.
