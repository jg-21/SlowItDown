document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("redirectUrl");
  const delayInput = document.getElementById("nudgeDelay");
  const status = document.getElementById("status");

  // Load saved values
  chrome.storage.sync.get(["redirectUrl", "nudgeDelay"], (data) => {
    if (data.redirectUrl) urlInput.value = data.redirectUrl;
    if (data.nudgeDelay) delayInput.value = data.nudgeDelay;
  });

  // Save redirect URL
  urlInput.addEventListener("change", () => {
    const url = urlInput.value.trim();
    if (url === "") {
      status.textContent = "⚠️ Please enter a valid URL.";
      return;
    }

    chrome.storage.sync.set({ redirectUrl: url }, () => {
      status.textContent = "✅ Redirect URL saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });

  // Save delay time
  delayInput.addEventListener("change", () => {
    const minutes = parseInt(delayInput.value.trim(), 10);

    if (isNaN(minutes) || minutes <= 0) {
      status.textContent = "⚠️ Enter a valid number of minutes.";
      return;
    }

    chrome.storage.sync.set({ nudgeDelay: minutes }, () => {
      status.textContent = "✅ Timer delay saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
