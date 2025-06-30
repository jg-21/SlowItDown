document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("redirectUrl");
  const status = document.getElementById("status");

  const delayInput = document.getElementById("nudgeDelay");
  const delayStatus = document.getElementById("delayStatus");

  chrome.storage.sync.get(["redirectUrl", "nudgeDelay"], (data) => {
    if (data.redirectUrl) input.value = data.redirectUrl;
    if (data.nudgeDelay) delayInput.value = data.nudgeDelay;
  });

  input.addEventListener("change", () => {
    chrome.storage.sync.set({ redirectUrl: input.value }, () => {
      status.textContent = "Saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });

  delayInput.addEventListener("change", () => {
    const minutes = parseInt(delayInput.value);
    if (!isNaN(minutes) && minutes > 0) {
      chrome.storage.sync.set({ nudgeDelay: minutes }, () => {
        delayStatus.textContent = "Delay saved!";
        setTimeout(() => (delayStatus.textContent = ""), 2000);
      });
    }
  });
});
