document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Boot sequence ---------- */
  const bootScreen = document.getElementById("boot-screen");
  const bootText   = document.getElementById("boot-text");

  const bootLines = [
    "> connecting to THE WIRED...",
    "> layer sync ..... OK",
    "> protocol: NAVI",
    "> loading presence data ...",
    "> present day, present time.",
    "",
    "> connection established_"
  ];

  const alreadyConnected = sessionStorage.getItem("wired_connected");

  if (bootScreen && !alreadyConnected) {
    sessionStorage.setItem("wired_connected", "true");

    let i = 0;
    let line = "";
    let li = 0;

    function typeBoot() {
      if (li >= bootLines.length) {
        setTimeout(() => {
          bootScreen.style.transition = "opacity 0.6s ease";
          bootScreen.style.opacity = "0";
          setTimeout(() => bootScreen.remove(), 700);
        }, 500);
        return;
      }
      const current = bootLines[li];
      if (i <= current.length) {
        line = current.slice(0, i);
        bootText.textContent =
          bootLines.slice(0, li).join("\n") + "\n" + line;
        i++;
        setTimeout(typeBoot, 15 + Math.random() * 25);
      } else {
        i = 0;
        li++;
        setTimeout(typeBoot, 150);
      }
    }

    typeBoot();
  } else if (bootScreen) {
    bootScreen.remove();
  }

  /* ---------- Typewriter tagline ---------- */
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    const full = tagline.textContent.trim();
    tagline.textContent = "";
    let k = 0;
    (function type() {
      if (k <= full.length) {
        tagline.textContent = full.slice(0, k);
        k++;
        setTimeout(type, 45);
      }
    })();
  }
});