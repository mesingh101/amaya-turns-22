const currentYear = document.getElementById("currentYear");
const revealButton = document.getElementById("revealButton");
const secretMessage = document.getElementById("secretMessage");
const petalField = document.getElementById("petalField");
const soundToggle = document.getElementById("soundToggle");
const gardenAudio = document.getElementById("gardenAudio");
const birthdayCake = document.getElementById("birthdayCake");
const friendName = document.getElementById("friendName");
const easterEgg = document.getElementById("easterEgg");

currentYear.textContent = new Date().getFullYear();

revealButton.addEventListener("click", () => {
  secretMessage.classList.add("show");
  revealButton.textContent = "For you, always ♥";
  growFlower(window.innerWidth / 2, window.innerHeight / 2, "💐", 2.2);
});

// 1. Click anywhere to leave a tiny flower.
document.addEventListener("click", (event) => {
  if (event.target.closest("button, a, .birthday-cake")) return;
  const flowers = ["🌸", "🌼", "🌺", "🌷", "✨"];
  const flower = flowers[Math.floor(Math.random() * flowers.length)];
  growFlower(event.clientX, event.clientY, flower);
});

function growFlower(x, y, flower = "🌸", scale = 1) {
  const bloom = document.createElement("span");
  bloom.className = "click-bloom";
  bloom.textContent = flower;
  bloom.style.left = `${x}px`;
  bloom.style.top = `${y}px`;
  bloom.style.setProperty("--bloom-scale", scale);
  document.body.appendChild(bloom);
  bloom.addEventListener("animationend", () => bloom.remove());
}

// 2. Press G to grow a small garden across the screen.
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "g" || event.repeat) return;

  for (let i = 0; i < 18; i += 1) {
    window.setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight - Math.random() * 160;
      const flowers = ["🌱", "🌷", "🌻", "🌸", "🌺"];
      growFlower(x, y, flowers[Math.floor(Math.random() * flowers.length)], 1.4);
    }, i * 70);
  }
});

// 3. Floating petals. Kept lightweight so the page stays smooth.
const petalSymbols = ["🌸", "🌺", "✿", "❀"];
for (let i = 0; i < 16; i += 1) {
  const petal = document.createElement("span");
  petal.className = "floating-petal";
  petal.textContent = petalSymbols[i % petalSymbols.length];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDelay = `${Math.random() * -18}s`;
  petal.style.animationDuration = `${12 + Math.random() * 12}s`;
  petal.style.fontSize = `${0.7 + Math.random() * 0.9}rem`;
  petalField.appendChild(petal);
}

// 4. Sunrise-to-sunset background while scrolling.
function updateSky() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));
}
window.addEventListener("scroll", updateSky, { passive: true });
updateSky();

// 6. Optional ambient audio. Browsers require a click before playing sound.
// Optional background music
gardenAudio.volume = 0.18;

soundToggle.addEventListener("click", async () => {
  try {
    if (gardenAudio.paused) {
      await gardenAudio.play();

      soundToggle.textContent = "🎵 Lakou Trankil: on";
      soundToggle.setAttribute("aria-pressed", "true");
    } else {
      gardenAudio.pause();

      soundToggle.textContent = "🎵 Lakou Trankil: off";
      soundToggle.setAttribute("aria-pressed", "false");
    }
  } catch (error) {
    console.error("Audio could not play:", error);
    soundToggle.textContent = "Audio could not load";
  }
});

// 7. Click or press Enter on the cake to blow out candles.
function blowOutCandles() {
  birthdayCake.classList.add("candles-out");
  birthdayCake.querySelector("p").textContent = "Make a wish, Amaya ✨";
  for (let i = 0; i < 12; i += 1) {
    setTimeout(() => {
      growFlower(
        birthdayCake.getBoundingClientRect().left + Math.random() * birthdayCake.offsetWidth,
        birthdayCake.getBoundingClientRect().top + Math.random() * birthdayCake.offsetHeight,
        "✨"
      );
    }, i * 60);
  }
}
birthdayCake.addEventListener("click", blowOutCandles);
birthdayCake.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") blowOutCandles();
});

// 8. Hidden Easter egg: click Amaya's name five times.
let nameClicks = 0;
friendName.addEventListener("click", () => {
  nameClicks += 1;
  if (nameClicks === 5) {
    easterEgg.classList.add("show");
    nameClicks = 0;
    setTimeout(() => easterEgg.classList.remove("show"), 6500);
  }
});

// 9. Open and close the messages inside the impact envelopes.
document.querySelectorAll(".impact-envelope-card").forEach((card) => {
  const envelopeButton = card.querySelector(".envelope-button");
  const letter = card.querySelector(".impact-letter");
  const closeButton = card.querySelector(".close-letter");

  envelopeButton.addEventListener("click", () => {
    card.classList.add("is-open");
    envelopeButton.setAttribute("aria-expanded", "true");
    letter.hidden = false;
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => {
    card.classList.remove("is-open");
    envelopeButton.setAttribute("aria-expanded", "false");
    letter.hidden = true;
    envelopeButton.focus();
  });
});
