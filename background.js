let timerId = null;

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startTimer") {
    console.log("⏱ Received startTimer");
    // Clear previous timer if any
    if (timerId) {
      clearTimeout(timerId);
      console.log("✅ Cleared previous timer");
    }

    chrome.storage.sync.get(["nudgeDelay"], (data) => {
      const minutes = parseInt(data.nudgeDelay);
      const delayMs =
        (!isNaN(minutes) && minutes > 0 ? minutes : 10) * 60 * 1000;
      console.log(`⏳ Setting timer for ${delayMs / 1000} seconds`);

      timerId = setTimeout(() => {
        // Send message to content script to show nudge
        console.log("🔔 Timer done! Sending showNudge");
        chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
          if (tabs.length > 0) {
            console.log("📨 Sending showNudge to tab", tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, { type: "showNudge" });
          } else {
            console.warn("❌ No matching tab found");
          }
        });
      }, delayMs);
    });

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
