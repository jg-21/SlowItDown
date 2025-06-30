let timerId = null;
const NUDGE_DELAY = 50000; // 10 minutes in ms

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startTimer") {
    // Clear previous timer if any
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      // Send message to content script to show nudge
      if (sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, { type: "showNudge" });
      }
    }, NUDGE_DELAY);

    sendResponse({ status: "timer started" });
  } else if (message.type === "stopTimer") {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    sendResponse({ status: "timer stopped" });
  }
  if (message.type === "openSettings") {
    chrome.runtime.openOptionsPage();
    sendResponse({ status: "options opened" });
  }
});
