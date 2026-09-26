document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Boot sequence ---------- */
  const bootScreen = document.getElementById("boot-screen");
  const bootText = document.getElementById("boot-text");

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
        bootText.textContent = bootLines.slice(0, li).join("\n") + "\n" + line;
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
  const tw = document.getElementById("typewriter");
  if (tw) {
    const phrases = [
      "no matter where you go, everyone's connected.",
      "close the world, open the next.",
      "layer 07 :: the wired"
    ];
    let p = 0, ch = 0, deleting = false;

    function loop() {
      const text = phrases[p];
      if (!deleting) {
        ch++;
        tw.textContent = text.slice(0, ch);
        if (ch === text.length) {
          deleting = true;
          setTimeout(loop, 2000);
          return;
        }
      } else {
        ch--;
        tw.textContent = text.slice(0, ch);
        if (ch === 0) {
          deleting = false;
          p = (p + 1) % phrases.length;
        }
      }
      setTimeout(loop, deleting ? 30 : 60);
    }
    loop();
  }

  /* ---------- Random glitch flicker ---------- */
  setInterval(() => {
    document.querySelectorAll(".glitch").forEach(el => {
      if (Math.random() > 0.9) {
        el.style.transform = `translate(${(Math.random()-0.5)*4}px,${(Math.random()-0.5)*2}px)`;
        setTimeout(() => (el.style.transform = ""), 80);
      }
    });
  }, 1500);
});
