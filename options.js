document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("redirectUrl");
  const status = document.getElementById("status");

  chrome.storage.sync.get(["redirectUrl"], (data) => {
    if (data.redirectUrl) input.value = data.redirectUrl;
  });

  input.addEventListener("change", () => {
    chrome.storage.sync.set({ redirectUrl: input.value }, () => {
      status.textContent = "Saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
