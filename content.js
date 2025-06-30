(function () {
  if (window.hasRun) return;
  window.hasRun = true;

  const createOverlay = (message, buttons) => {
    const overlay = document.createElement("div");
    overlay.id = "mindfulOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.zIndex = 999999;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "#fff";
    overlay.style.fontSize = "1.5rem";
    overlay.style.textAlign = "center";

    const container = document.createElement("div");
    container.innerHTML = `<p>${message}</p>`;

    buttons.forEach(({ id, text, onClick }) => {
      const btn = document.createElement("button");
      btn.id = id;
      btn.style.margin = "10px";
      btn.style.padding = "10px 20px";
      btn.style.fontSize = "1rem";
      btn.textContent = text;
      btn.onclick = () => onClick(overlay);
      container.appendChild(btn);
    });

    overlay.appendChild(container);
    document.documentElement.appendChild(overlay);

    return overlay;
  };

  // Initial mindful prompt
  const initialOverlay = createOverlay(
    "Are you here with intention or out of habit?",
    [
      {
        id: "continueBtn",
        text: "Continue",
        onClick: (overlay) => {
          overlay.remove();
          // Start timer after user continues
          chrome.runtime.sendMessage({ type: "startTimer" });
        },
      },
      {
        id: "closeTabBtn",
        text: "Never Mind",
        onClick: () => {
          chrome.storage.sync.get(["redirectUrl"], (data) => {
            const url = data.redirectUrl || "https://asoftmurmur.com/";
            window.location.href = url;
          });
        },
      },
      {
        id: "settingsBtn",
        text: "Settings",
        onClick: () => {
          chrome.runtime.sendMessage({ type: "openSettings" });
        },
      },
    ]
  );

  // Listen for messages from background to show nudge
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "showNudge") {
      // If overlay is already open, do nothing
      if (document.getElementById("mindfulOverlay")) return;

      createOverlay(
        "You’ve been on YouTube for 10 minutes. Time for a mindful break?",
        [
          {
            id: "keepWatchingBtn",
            text: "Keep Watching",
            onClick: (overlay) => {
              overlay.remove();
              // Restart timer after dismissing nudge
              chrome.runtime.sendMessage({ type: "startTimer" });
            },
          },
          {
            id: "takeBreakBtn",
            text: "Take a Break",
            onClick: () => {
              chrome.storage.sync.get(["redirectUrl"], (data) => {
                const url = data.redirectUrl || "https://asoftmurmur.com/";
                window.location.href = url;
              });
            },
          },
          {
            id: "settingsBtn",
            text: "Settings",
            onClick: () => {
              chrome.runtime.sendMessage({ type: "openSettings" });
            },
          },
        ]
      );
    }
  });

  // Stop timer when user leaves the tab or navigates away
  window.addEventListener("beforeunload", () => {
    chrome.runtime.sendMessage({ type: "stopTimer" });
  });
})();
