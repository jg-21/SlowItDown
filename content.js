(function () {
  if (window.hasRun) return;
  window.hasRun = true;

  // 🌀 Watch for SPA URL changes
  function onUrlChange(callback) {
    let currentUrl = location.href;

    const observer = new MutationObserver(() => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        callback(currentUrl);
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }

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

    buttons.forEach(({ id, text, tooltip, onClick, style }) => {
      const btn = document.createElement("button");
      btn.id = id;
      btn.textContent = text;
      if (tooltip) btn.title = tooltip; // Add tooltip here
      btn.onclick = () => onClick(overlay);

      // Apply custom styles if provided
      if (style) {
        Object.keys(style).forEach((key) => {
          btn.style[key] = style[key];
        });
      }

      container.appendChild(btn);
    });

    overlay.appendChild(container);
    document.documentElement.appendChild(overlay);

    return overlay;
  };

  // 🪄 Reusable prompt
  function showMindfulPrompt() {
    if (document.getElementById("mindfulOverlay")) return;

    createOverlay(
      "Hey there 👋<br>Are you here with intention or just out of habit?",
      [
        {
          id: "continueBtn",
          text: "Yes, Continue",
          tooltip: "Stay on this page and start the mindful timer",
          onClick: (overlay) => {
            overlay.remove();
            chrome.runtime.sendMessage({ type: "startTimer" });
          },
        },
        {
          id: "closeTabBtn",
          text: "No, Take Me Back",
          tooltip: "Redirect to your calming site instead",
          onClick: () => {
            chrome.storage.sync.get(["redirectUrl"], (data) => {
              const url = data.redirectUrl || "https://asoftmurmur.com/";
              window.location.href = url;
            });
          },
        },
        {
          id: "disableNudgeBtn",
          text: "Disable Reminder",
          tooltip: "Turn off reminder for this YouTube session",
          onClick: (overlay) => {
            overlay.remove();
            window.nudgesDisabled = true; // Set a flag to disable nudges
          },
        },
        {
          id: "settingsBtn",
          text: "Adjust Settings",
          tooltip: "Change timer delay or redirect destination",
          style: {
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px", // Increased padding for a larger button
            fontSize: "1rem", // Slightly larger font size
            backgroundColor: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          },
          onClick: () => {
            chrome.runtime.sendMessage({ type: "openSettings" });
          },
        },
      ]
    );
  }

  // 🛎 Initial load
  showMindfulPrompt();

  // ♻️ SPA support
  onUrlChange(() => {
    const existing = document.getElementById("mindfulOverlay");
    if (existing) existing.remove();
    showMindfulPrompt();
  });

  // Listen for messages from background to show nudge
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "showNudge") {
      // If nudges are disabled or overlay is already open, do nothing
      if (window.nudgesDisabled || document.getElementById("mindfulOverlay"))
        return;

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
          {
            id: "disableNudgeBtn",
            text: "Disable Reminder",
            tooltip: "Turn off reminder for this YouTube session",
            onClick: (overlay) => {
              overlay.remove();
              window.nudgesDisabled = true; // Set a flag to disable nudges
            },
          },
        ]
      );
    }
  });
})();
