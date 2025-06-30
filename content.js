(function () {
  if (window.hasRun) return;
  window.hasRun = true;

  const overlay = document.createElement("div");
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
  overlay.innerHTML = `
    <div>
      <p>Are you here with intention or out of habit?</p>
      <button id="continueBtn" style="margin: 10px; padding: 10px 20px; font-size: 1rem;">Continue</button>
      <button id="closeTabBtn" style="margin: 10px; padding: 10px 20px; font-size: 1rem;">Never Mind</button>
    </div>
  `;

  document.documentElement.appendChild(overlay);

  document.getElementById("continueBtn").onclick = () => {
    overlay.remove();
  };

  document.getElementById("closeTabBtn").onclick = () => {
    window.location.href = "https://google.com";
  };
})();
